# Description

Tamper monkey script for changing Anime music quiz avatar to any existing avatar or a custom image of your choosing. Changes are only visible to others using the script.

# How to Use

## Existing avatars

1. Set your current username in the `currentUsername` variable in `AMQ_custom_avatars.js`.

```javascript
const currentUsername = "<yourUsername>";
```

2. Add your settings to the `users array` in the following format in `AMQ_custom_avatars.js`.

```javascript
const users = [
  ,
  // Previous users...
  {
    username: "<yourUsername>",
    background: "<backGround>",
    avatarName: "<avatarName>",
    avatarVariant: "<avatarVariant>",
    avatarProp: "<avatarProp",
    avatarColor: "<avatarColor>",
  },
];
```

3. `Download tamper monkey` browser extension if you don't have it.

4. Create a new script and paste AMQ_custom_avatars.js into it after you've made your changes.

## Custom images

To add custom images simply add push them to avatarSets array using the following formating

```javascript
avatarSets.push({
  username: "<yourUsername>",
  head: "<headUrl>",
  background: "<backgroundUrl>",
  sets: {
    base: "<baseUrl>",
    think: "<thinkURL>",
    wait: "<waitUrl>",
    noAnswer: "<noAnswerURL>",
    correct: "<correctUrl>",
    wrong: "<WrongUrl>",
  },
});
```

Note: Ensure there are now duplicate users caused by adding custom images.

# Finding Avatar Info

## Avatar skins

To get your desired avatars name, variant, prop, and color, select them in the avatar browser and then find the element with id `#swRightColumnAvatarImageContainer`. On that element, there is an image with the `srcset` attribute. In that attribute, look for "/avatars" in a URLs. After this text is the name, variant, prop, and color formatted as follows: `/avatars/<avatarName>/<avatarVariant>/<avatarProp>/<avatarColor>`.

## Avatar backgrounds

To get an avatar background, again locate the element with id `#swRightColumnAvatarImageContainer`. On this element, there should be a `style tag`. Its contents should look like this: `style="background-image: url("<background>");`. The background is the url in the section <background>.

Note: `Avatar height` is determined by your currently equipped avatar

# Example

```html
<div id="swRightColumnAvatarImageContainer" class="floatingContainer avatarDisplay sizeMod51 Noel Catgirl" style="background-image: url("https://cdn.animemusicquiz.com/v1/backgrounds/250px/noel_catgirl_brown_vert.webp");">
    <img class="avatarImage" src="https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/900px/Basic.webp" srcset="https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/100px/Basic.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/150px/Basic.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/250px/Basic.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/350px/Basic.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/500px/Basic.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/600px/Basic.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/900px/Basic.webp 900w">
  <div class="avatarSpineContainer hide"><canvas class="avatarSpine"></canvas></div>
</div>
```

Converts to

```javascript
const currentUsername = "<your username>";

const users = [
  ,
  // Previous users ...
  {
    username: "<your username>",
    background:
      "https://cdn.animemusicquiz.com/v1/backgrounds/250px/noel_catgirl_brown_vert.webp",
    avatarName: "Noel",
    avatarVarient: "Catgirl",
    avatarProp: "Hairband",
    avatarColor: "brown",
  },
];
```
