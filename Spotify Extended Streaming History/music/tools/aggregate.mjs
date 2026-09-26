// Re-aggregate the Spotify history JSON into ../listening-summary.json (no IP addresses kept).
// Usage: node music/tools/aggregate.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = "C:/Users/hayab/Desktop/Spotify Extended Streaming History";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "listening-summary.json");
const PLAY_MS = 30000;
const TOP_N = 50;

const files = fs.readdirSync(SRC).filter(f => /^Streaming_History_(Audio|Video)_\d+\.json$/.test(f));
const rows = [];
for (const f of files) {
  const video = f.includes("_Video_");
  for (const r of JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8"))) rows.push({ ...r, _video: video });
}
rows.sort((a, b) => a.ts.localeCompare(b.ts));

// JST = UTC+9, no DST
function jst(ts) {
  const d = new Date(Date.parse(ts) + 9 * 3600e3);
  return {
    y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, day: d.toISOString().slice(0, 10),
    ym: d.toISOString().slice(0, 7), dow: (d.getUTCDay() + 6) % 7, h: d.getUTCHours(),
  };
}

function platformName(p) {
  const s = (p || "").toLowerCase();
  if (s.includes("amazon") || s.includes("echo")) return "スマートスピーカー";
  if (s.includes("yamaha") || s.includes("linkplay")) return "サウンドバー";
  if (s.startsWith("web_player")) return "Webプレイヤー";
  if (s.includes("android")) return "Android";
  if (s.includes("ios")) return "iOS";
  if (s.includes("windows")) return "Windows";
  if (s === "cast") return "Cast";
  return "不明";
}

const inc = (o, k, v = 1) => (o[k] = (o[k] || 0) + v);

function newBucket() {
  return {
    ms: 0, plays: 0, records: 0, musicMs: 0, podcastMs: 0, videoMs: 0,
    tracks: new Map(), artists: new Map(), albums: new Map(), shows: new Map(),
    heat: Array.from({ length: 7 }, () => Array(24).fill(0)),
    platform: {}, country: {}, reasonEnd: {}, months: {}, days: {},
    musicRecords: 0, skips: 0, shuffle: 0, offline: 0,
    first: null, last: null,
  };
}
const buckets = { all: newBucket() };
const artistFirst = new Map(); // artist -> ym of first ≥30s play

function add(map, key, meta, ms, played, skipped) {
  let e = map.get(key);
  if (!e) map.set(key, (e = { ...meta, ms: 0, plays: 0, n: 0, skips: 0 }));
  e.ms += ms; e.n++;
  if (played) e.plays++;
  if (skipped) e.skips++;
}

for (const r of rows) {
  const t = jst(r.ts);
  const ms = r.ms_played || 0;
  const played = ms >= PLAY_MS;
  const isTrack = !!r.master_metadata_track_name;
  const isEp = !!r.episode_name;
  const skipped = r.skipped === true || r.reason_end === "fwdbtn";
  if (isTrack && played) {
    const a = r.master_metadata_album_artist_name;
    if (!artistFirst.has(a)) artistFirst.set(a, t.ym);
  }
  for (const b of [buckets.all, (buckets[t.y] ||= newBucket())]) {
    b.ms += ms; b.records++;
    if (played) b.plays++;
    if (r._video) b.videoMs += ms;
    if (isTrack) b.musicMs += ms;
    if (isEp) b.podcastMs += ms;
    b.first ??= r.ts; b.last = r.ts;
    b.heat[t.dow][t.h] += ms;
    inc(b.platform, platformName(r.platform), ms);
    inc(b.country, r.conn_country || "ZZ", ms);
    inc(b.reasonEnd, r.reason_end || "unknown");
    inc(b.months, t.ym, ms);
    inc(b.days, t.day, ms);
    if (isTrack) {
      b.musicRecords++;
      if (skipped) b.skips++;
      if (r.shuffle) b.shuffle++;
      if (r.offline) b.offline++;
      const artist = r.master_metadata_album_artist_name;
      const album = r.master_metadata_album_album_name;
      add(b.tracks, r.spotify_track_uri || r.master_metadata_track_name + "|" + artist,
        { name: r.master_metadata_track_name, artist }, ms, played, skipped);
      add(b.artists, artist, { name: artist }, ms, played, skipped);
      add(b.albums, album + "|" + artist, { name: album, artist }, ms, played, skipped);
    } else if (isEp) {
      add(b.shows, r.episode_show_name, { name: r.episode_show_name }, ms, played, false);
    }
  }
}

const min = ms => Math.round(ms / 60000);
const top = (map, n = TOP_N) => [...map.values()].sort((a, b) => b.ms - a.ms).slice(0, n)
  .map(({ ms, plays, n: recs, skips, ...meta }) => ({ ...meta, min: min(ms), plays, skipRate: recs ? +(skips / recs).toFixed(3) : 0 }));
const toMin = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, min(v)]));

const out = { generated: new Date().toISOString(), playThresholdSec: 30, periods: {} };
for (const [key, b] of Object.entries(buckets)) {
  const skippy = [...b.artists.values()].filter(a => a.n >= 25)
    .sort((a, c) => c.skips / c.n - a.skips / a.n).slice(0, 10)
    .map(a => ({ name: a.name, n: a.n, skipRate: +(a.skips / a.n).toFixed(3) }));
  const topDay = Object.entries(b.days).sort((a, c) => c[1] - a[1])[0];
  out.periods[key] = {
    first: b.first, last: b.last,
    min: min(b.ms), plays: b.plays, records: b.records,
    musicMin: min(b.musicMs), podcastMin: min(b.podcastMs), videoMin: min(b.videoMs),
    uniqueTracks: b.tracks.size, uniqueArtists: b.artists.size, uniqueAlbums: b.albums.size,
    musicRecords: b.musicRecords, skips: b.skips, shuffle: b.shuffle, offline: b.offline,
    activeDays: Object.keys(b.days).length,
    topDay: topDay ? { day: topDay[0], min: min(topDay[1]) } : null,
    topArtists: top(b.artists), topTracks: top(b.tracks), topAlbums: top(b.albums, 30), topShows: top(b.shows, 10),
    skippyArtists: skippy,
    heat: b.heat.map(row => row.map(v => +(v / 60000).toFixed(1))),
    platform: toMin(b.platform), country: toMin(b.country), reasonEnd: b.reasonEnd,
    months: toMin(b.months),
    days: key === "all" ? undefined : toMin(b.days),
  };
}
const newArtists = {};
for (const ym of artistFirst.values()) inc(newArtists, ym);
out.newArtistsByMonth = newArtists;

fs.writeFileSync(OUT, JSON.stringify(out));
const a = out.periods.all;
console.log("records", rows.length, "hours", Math.round(a.min / 60), "plays", a.plays, "artists", a.uniqueArtists, "tracks", a.uniqueTracks);
console.log("years", Object.keys(out.periods).join(","));
console.log("top5", a.topArtists.slice(0, 5).map(x => `${x.name} ${x.min}m`).join(" / "));
console.log("topTracks", a.topTracks.slice(0, 5).map(x => `${x.name} - ${x.artist} ${x.plays}`).join(" / "));
console.log("platform", JSON.stringify(a.platform), "country", JSON.stringify(a.country));
console.log("size KB", Math.round(fs.statSync(OUT).size / 1024));
