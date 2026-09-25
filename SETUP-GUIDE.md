# [ R | M Λ ] — Music Player Setup Guide

The [ R | M Λ ] player plays your band's songs with lyrics that follow the music, a karaoke mode, colour themes, light/dark/auto mode and a genre-aware equalizer. It comes in two versions:

| Version | Where it runs | Who can open it |
|---|---|---|
| **Company app** | Power Apps (Microsoft 365) | You, and anyone you share it with in your organisation |
| **Web version** (`RMA_web.zip`) | GitHub Pages — your own free website | Anyone with the link |

The player starts **empty** — listeners see "New music is on the way" until you add your tracks.

**Only you can add music.** Listeners get a player only: there is no upload button, no "add music" and no lyric editor for them. Music reaches the player in one way only — you put the files on your site (or ask Copilot to put them in the company app). See section 6.

---

## 1. Put the web version on GitHub (about 15 minutes, once)

There are two ways to do everything in this guide. **GitHub Desktop** (recommended) keeps a copy of your site in a normal folder on your computer: you copy files in, then click *Commit* and *Push*. The **GitHub website** works from any browser without installing anything. Pick one and stick with it.

### 1A. With GitHub Desktop (recommended)

**Install and sign in (once)**
1. Download GitHub Desktop from **https://desktop.github.com** and install it.
2. Open it and sign in with your GitHub account (`golshanamirse`). If it doesn't ask you: Windows **File → Options → Accounts**, Mac **GitHub Desktop → Settings → Accounts** → **Sign in**.

**Create the site**
3. **File → New repository…**
   - Name: `RIMA` (GitHub names can't contain the symbols of the band name; the name becomes part of the web address).
   - Local path: keep the suggested folder (usually `Documents\GitHub`). Your site will live in `Documents\GitHub\RIMA`.
   - Leave **Initialize this repository with a README** unticked, Git ignore **None**, License **None** → **Create repository**.
4. **Repository → Show in Explorer** (Mac: **Show in Finder**). This opens the empty `RIMA` folder.
5. **Unzip** `RMA_web.zip` and copy **everything inside it** into the `RIMA` folder: `index.html`, `404.html`, `sw.js`, `version.json`, `manifest.webmanifest`, `.nojekyll`, `README.md`, `SETUP-GUIDE.md` and the folders `assets`, `icons` and `music`. (Copy the contents, not the unzipped folder itself.)
6. Back in GitHub Desktop, the files appear under **Changes**. At the bottom left type a summary such as `First version` → **Commit to main**.
7. Click **Publish repository** (top bar). **Untick "Keep this code private"** — GitHub Pages is free for public repositories. Public means people can *see* the files; they still **cannot change** them. → **Publish repository**.

**Switch on the website**
8. **Repository → View on GitHub** opens the repository in your browser → **Settings** → **Pages** (left menu) → under *Build and deployment* choose **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → **Save**.
9. Wait 1–2 minutes, then open **https://golshanamirse.github.io/RIMA/** (the address also appears at the top of the Pages settings once it is live).

### 1B. With the GitHub website only

1. **Sign in** at https://github.com (your account: `golshanamirse`).
2. **Create a repository:** top-right **+** → **New repository** → Name `RIMA` → **Public** → leave "Add a README" **unticked** → **Create repository**.
3. **Unzip** `RMA_web.zip` on your computer.
4. On the new repository page click **uploading an existing file**. Select **everything inside the unzipped folder** (not the folder itself, and not the zip) and drag it into the browser. Folders keep their structure.
   - Tip: `.nojekyll` is a hidden file. It is optional — the site works without it.
5. Type a message such as `First version` → **Commit changes**.
6. **Settings** → **Pages** → **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → **Save**.
7. Wait 1–2 minutes, then open **https://golshanamirse.github.io/RIMA/**.

You should see the [ R | M Λ ] player with "New music is on the way". Now add your first tracks (section 2).

---

## 2. Add your tracks with lyrics (only you)

Everything the player plays lives in the **`music`** folder of your repository:

```
music/
  library.json          ← the list of songs (the player reads this)
  my-song.mp3           ← the song
  my-song.lrc           ← its timed lyrics (optional)
  my-song.jpg           ← its cover picture (optional)
```

### Before you start — prepare each song

| Check | Why |
|---|---|
| Format **MP3** (best), M4A, OGG, WAV or FLAC — MP3 at 192–320 kbps is a good balance | Plays on every phone and browser; WAV/FLAC files are very large |
| Each file **under 100 MB** | GitHub refuses bigger files |
| File name in **lowercase with hyphens**, e.g. `night-drive.mp3` | Web addresses are case-sensitive and spaces cause problems |
| Lyrics (optional) with the **same name**: `night-drive.lrc` | The owner tools match song and lyrics by name |
| Cover picture (optional) `night-drive.jpg`, square, about 1000 × 1000 px, under 1 MB | Shown in the library and on the stage |
| Know each song's **genre** (Rock, Pop, Electronic…) | The Auto equalizer uses it |
| Songs in the **music folder only** — not in the top level of the site | The player only looks in `music/` |

Tip: songs that already have a title, artist, album, genre, year or cover saved inside the MP3 (tags) are read automatically by the owner tools.

### Step A — make the song list (library.json) with the owner tools
1. On your computer, open **https://golshanamirse.github.io/RIMA/#owner** (the `#owner` at the end shows your tools).
2. **Add music** → **Play from this device** → **Choose songs and lyrics** → select all your prepared songs and their `.lrc` files at once.
3. Check each song in the list: it plays on your device only, shows "lyrics found" when a lyric file matched, and has a **genre** box — set it for any song that has none.
4. No lyrics yet? Use **Lyric Studio** now (section 3), download the `.lrc` file and put it with the song.
5. Tab **Publish to your site** → **Download library.json**. It lists the songs already on your site **plus** the new ones.

### Step B — put the files on the site

**With GitHub Desktop**
1. In GitHub Desktop choose the `RIMA` repository → **Fetch origin** (and **Pull origin** if it appears), so your folder has the latest version.
2. **Repository → Show in Explorer** → open the **music** folder.
3. Copy in the new songs, their `.lrc` files and covers.
4. Copy in the downloaded **library.json** and choose **Replace** (Windows may have named the download `library (1).json` — rename it to exactly `library.json`).
5. GitHub Desktop lists the new files under **Changes** → summary such as `Add 3 songs` → **Commit to main** → **Push origin**.

**With the GitHub website**
1. Open the repository → **music** folder → **Add file** → **Upload files**.
2. Drop the new songs, `.lrc` files, covers **and** the downloaded `library.json` (it replaces the old one) → **Commit changes**.

### Step C — check
Wait 1–2 minutes and open **https://golshanamirse.github.io/RIMA/**. The new songs are in the library; anyone who has the player open gets a "New song" message. Press play and check the lyrics follow the music.

### Editing library.json by hand (optional)
You can also edit the list directly: GitHub website → `music/library.json` → pencil icon (**Edit**), or open it in Notepad from the `RIMA\music` folder. Each song looks like this:

```json
{
  "version": 1,
  "title": "[ R | M Λ ]",
  "tracks": [
    {
      "title": "My Song",
      "album": "First Album",
      "genre": "Rock",
      "year": 2026,
      "audio": "my-song.mp3",
      "lyrics": "my-song.lrc",
      "cover": "my-song.jpg"
    }
  ]
}
```

Only `audio` is required. If you leave out `artist`, the player shows **[ R | M Λ ]**. Separate songs with a comma — the last song has no comma after it. The order in the file is the order in the library.

### Field reference

| Field | What it does |
|---|---|
| `audio` | File name of the song inside `music/` (or a full `https://` address) |
| `lyrics` | `.lrc` file (timed) or `.txt` file (untimed) |
| `title`, `artist`, `album`, `year` | Shown in the library and on the stage (no `artist` = [ R | M Λ ]) |
| `genre` | Used by the **Auto** equalizer to choose the sound (see section 4) |
| `cover` | Picture file in the same site (`.jpg`, `.png`, `.webp`). Without it the player draws artwork |
| `colors` | Optional three colours such as `["#ff2e88", "#7b2cff", "#00d9ff"]` for the artwork and the *Dynamic* theme |
| `art` | Optional drawn artwork style: `skyline`, `planes`, `cafe`, `road` (anything else = abstract waves) |

---

## 3. Lyric files (.lrc)

An `.lrc` file is plain text. Each line starts with the time (minutes:seconds.hundredths) at which it is sung:

```
[ti:My Song]
[ar:The Artist]
[00:12.40]First line of the song
[00:16.85]Second line of the song
[00:21.10]♪
[00:25.00]Third line after a music break
```

- `♪` on its own marks an instrumental break (the player shows animated dots).
- `[offset:+300]` shifts all lyrics later by 300 ms (use a minus sign for earlier).
- **Word-by-word karaoke timing (optional):** put a time in angle brackets before each word, plus one at the end of the line:
  `[00:12.40]<00:12.40>First <00:12.90>line <00:13.30>of <00:13.50>the <00:13.70>song <00:14.60>`
  Without word times, the player spreads the words across the line automatically.

### Make an .lrc file in the player — Lyric Studio (owner tools)
1. Open the player with **#owner** at the end of the address → **Lyric Studio** (pencil icon at the top).
2. Paste the lyrics, one line per row → **Start syncing**.
3. Tap **Next line** (or press Space) at the moment each line starts. **Undo** steps back if you miss one.
4. Adjust **Timing nudge** if the lyrics feel early or late, then **Use these lyrics now** and **Download** the `.lrc` file.
5. Upload the `.lrc` to `music/` and point the song's `"lyrics"` field at it.

---

## 4. Using the player

| Feature | How |
|---|---|
| Synced lyrics | Lyrics scroll by themselves and the current line fills word by word. Tap any line to jump there. Scroll freely — **Back to current line** brings you back |
| Karaoke | Microphone button (top bar, player bar or **Sing along**). *Singer's voice* slider lowers the lead vocal (0 % = removed as much as possible); *Tempo* slows the song down for practice without changing the pitch |
| Equalizer | Sliders button. **Flat** (standard, all bands 0 dB) · **Original** (equalizer switched off completely) · **Auto** (chosen from each song's genre) · **Presets** (Pop, Rock, Electronic, Hip-Hop, Jazz, Classical, Acoustic, R&B/Soul, Latin, Metal, Lo-fi, Vocal boost, Bass boost, Treble boost, Podcast) · **Custom** (10 bands, saved for next time) |
| Look & feel | Palette button. Appearance **Auto** (follows your device) / **Light** / **Dark**; themes *Dynamic* (colours follow each song), Emerald, Aurora, Sunset, Ocean, Crimson, Midnight; stage *Cover*, *Vinyl* or *Visualizer*; lyric size; moving background; sleep timer |
| Library | Search, genre filters, **Liked** songs (heart), **Recently played**, shuffle and repeat |
| First start | A short welcome: choose Auto/Light/Dark and a theme, then see how to install the player on this device |
| Loading screen | The web version opens with a [ R | M Λ ] loading screen whose equalizer bars fill with the real download progress. If something goes wrong it offers **Try again** and **Clear saved copy and reload** |
| Picks up where you stopped | The player remembers the last song and the exact second, and offers **Continue … from 1:23** next time |
| New songs | When you upload new songs while someone has the player open, they get a "New song" message with a **Play** button |
| Full screen | Full-screen button at the top (or press F) — handy for lyrics and karaoke |
| Screen stays on | During karaoke the screen doesn't go dark while the song plays (where the browser allows it) |
| iPhone silent switch | Music keeps playing when the iPhone is on silent, like a music app |
| Settings → App | **Install as app** (step-by-step for this device), **Full screen**, **Check for updates** (web version), **Close the app** (goodbye screen; iPhone apps are closed by swiping them away), **Reset settings** (starts fresh on this device) |
| Settings → About | Band name, version and build date |
| Owner tools (you) | Add **#owner** to the address: adds **Add music** and **Lyric Studio**. Listeners never see them |
| Keyboard | Space play/pause · ←/→ 5 s · Shift+←/→ previous/next · K karaoke · F full screen · E equalizer · L like · S shuffle · R repeat · M mute |
| Phone app | Settings → **Install as app** shows the steps for the device in use (iPhone/iPad, Android, Chromebook, Windows, Mac, Linux). On Chrome/Edge an **Install the app now** button appears |

**Auto equalizer genres:** Pop · Rock/Punk/Indie/Alternative · Electronic/EDM/House/Techno/Dance/Synth · Hip-Hop/Rap/Trap · R&B/Soul/Funk · Jazz/Blues/Swing/Lounge · Classical/Orchestral/Piano/Instrumental/Soundtrack · Latin/Reggaeton/Salsa/Flamenco · Acoustic/Folk/Country/World · Metal · Lo-fi/Chill/Ambient · Podcast/Spoken. Anything else plays Flat.

**About karaoke voice removal:** it works by cancelling the sound in the centre of a stereo mix, where the lead singer normally is. It works best on studio stereo recordings; mono files, live recordings or songs with wide-panned vocals keep more of the voice. The bass and drums are preserved.

---

## 5. Updating the site

**Your routine for new songs:** prepare the files → owner tools make `library.json` → copy both into `music` → commit and push (GitHub Desktop) or upload (website) → check after 1–2 minutes.

- **New songs** appear by themselves: the song list is checked every time the player opens or comes back to the screen.
- **Remove a song:** delete its files from `music` and its entry from `library.json` (the owner tools only add, so remove the entry by hand), then commit and push.
- **New player versions reach everyone automatically.** Each version carries a `version.json` file. When listeners open the player (or come back to it) it compares itself with the site: if nothing is playing it switches to the new version by itself, and if music is playing it shows **Update now** instead, so nobody is interrupted. After the switch they see "The player was updated" — settings, likes and place are kept.
- **Install a new player version (from a new zip):** unzip it and copy everything **except the `music` folder** into your `RIMA` folder, choosing **Replace** (GitHub Desktop) — or upload those files on the website. Keep your own `music` folder, so your songs and `library.json` stay. Then commit and push. Old files in `assets` can stay; they do no harm.
- **Working from two places:** if you sometimes upload on the website and sometimes use GitHub Desktop, always click **Fetch origin** → **Pull origin** in GitHub Desktop before copying files in. Otherwise Desktop refuses to push and asks you to pull first.
- The player works offline after the first visit (the app itself; songs need a connection).

---

## 6. Who can add music — only you

| Where | What protects it |
|---|---|
| Web version | Only people with **write access** to the `RIMA` repository can change files — that is only you. Don't add collaborators under **Settings → Collaborators**. Strangers can suggest changes (pull requests), but nothing changes unless you approve them yourself |
| Company app | Only the app's owner (you) can edit and publish it. When you share it, give people **use/play** access, not **edit** access |
| Owner tools (`#owner`) | They only prepare files on the device that uses them. They cannot upload or change anything on your site, so a listener who finds them still can't add music to your player |

Tip: switch on two-step sign-in for GitHub (**Settings → Password and authentication**) so nobody else can get into your account.

## 7. Limits and good practice

- GitHub: each file must be under **100 MB**; keep the whole site under about **1 GB** and **100 GB of traffic per month** (a normal MP3 is 3–10 MB).
- The web version is **public** — anyone can listen and could download the files. Only upload music you own or have the right to share.
- Songs hosted on another website play only if that site allows it (GitHub Pages sites do).

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| The player keeps showing an old version | Settings → **Check for updates** → **Update now**. On the loading screen, **Clear saved copy and reload** also forces the newest version |
| Page shows 404 | Wait 2 minutes; check **Settings → Pages** says *Your site is live*; make sure `index.html` is in the top level of the repository, not inside a folder |
| "New music is on the way" after you uploaded | The song isn't listed in `music/library.json` yet, or the file name is misspelled |
| GitHub Desktop says "Newer commits on remote" or won't push | Click **Pull origin** first, then **Push origin** |
| GitHub Desktop warns a file is too large | The song is over 100 MB — export it as MP3 (192–320 kbps) |
| A new song doesn't appear | `library.json` has a typo — usually a missing or extra comma. Paste it into https://jsonlint.com to find the line |
| "This song could not be played" | The `audio` name doesn't match the uploaded file exactly (capital letters, spaces, extension) |
| Lyrics don't move | The file has no times — sync it in Lyric Studio |
| Lyrics are early/late | Add `[offset:+500]` (later) or `[offset:-500]` (earlier) to the `.lrc` |
| No sound on iPhone | Turn off silent mode, then press play again |

## 9. The company app (Power Apps)

- Open it from the link you received after publishing. It is the same player; it also starts empty.
- To add your tracks there, give Copilot the song files (and `.lrc` files) and ask it to add them to the company app and publish it again. Listeners can't add anything.
- Share it with colleagues from the Power Apps portal (make.powerapps.com → Apps → **Share**) with use access, or ask Copilot to share it with named people.
