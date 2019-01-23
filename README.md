# Discord Bot Using JavaScript

## Info

- This is a bot built from reference videos
  - [{TheSourceCode}](https://www.youtube.com/channel/UCNXt2MrZaqfIBknamqwzeXA)
- My Discord setup
  - everyone can access: #welcome\*, #rules, #announcements, #role-assignment\*
  - Member can access: #general*, #photos-screenshots*, & everything else aside from some admin channels like #staff\*
    - You can build from there what roles and other locked channels you'd like. I do this just so people acknowledge the rules channel in role-assignment to make sure they read it.
- Skipped Sections
  - Fortnite content(I have no interest in this game)
  - MongoDB content(I have every intention to set up my discord's bot with MySQL)
- Comments
  - I stopped commenting at the utilities video because all of the code has been commented for the past videos. Any new code structures will have comments

**"\*": channels used in code**

## Before you run!

- create a new file in the root directory named `botconfig.json`
  - structure it as so:

```json
{
  "token": "PUT YOUR BOT TOKEN HERE",
  "prefix": "!",
  "red": "#b70000",
  "orange": "#ff6a00",
  "green": "#00ff26",
  "purple": "#d604cf"
}
```

## I hope this breakdown helps!
