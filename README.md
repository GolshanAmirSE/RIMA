# [ R | M Λ ]

The band's music player — lyrics that follow the song, karaoke mode, colour themes, Light / Dark / Auto and a genre-aware equalizer (Flat · Original · Auto · Presets · Custom).

**Listen:** https://golshanamirse.github.io/RMA/

## Add a track (owner only)
1. Upload `my-song.mp3` (and optional `my-song.lrc`, `my-song.jpg`) to the `music` folder.
2. List it in `music/library.json`:
   ```json
   { "title": "My Song", "genre": "Rock", "audio": "my-song.mp3", "lyrics": "my-song.lrc", "cover": "my-song.jpg" }
   ```
3. Commit and refresh the site after a minute.

Owner tools: https://golshanamirse.github.io/RMA/#owner — full instructions in [SETUP-GUIDE.md](SETUP-GUIDE.md)
