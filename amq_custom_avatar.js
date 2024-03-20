// ==UserScript==
// @name         Amq Custom avatars
// @namespace    http://tampermonkey.net/
// @version      2024-03-20
// @description  Replace the AMQ avatar of inputed user with specified avatar. Each user must be using the script
// @author       Riaru
// @match        https://animemusicquiz.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animemusicquiz.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  /*
  Automaticlly run this script using tamper monkey or similar extension

  Ensure you set current user and add your settings to the users list

  To get your desired avatars name, varient, prop and color select them in the browser and then find the element with id #swRightColumnAvatarImageContainer.
  On that element there is an image with the srcset attribute. In the attribute look for "/avatars" in a url, after it is name, varient, prop and color
  formated as follows: /avatars/<avatarName>/<avatarVarient>/<avatarProp>/<avatarColor>.

  To get an avatar background again locate the element with id #swRightColumnAvatarImageContainer. On this element there should style tag
  its contents should look like this: style="background-image: url("<background>"); Copy the <background> section

 Format these element in json in json and add theme to the users array like the following example

 For example:

 <div id="swRightColumnAvatarImageContainer" class="floatingContainer avatarDisplay sizeMod51 Noel Catgirl" style="background-image: url("https://cdn.animemusicquiz.com/v1/backgrounds/250px/noel_catgirl_brown_vert.webp");">
    <img class="avatarImage" src="https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/900px/Basic.webp" srcset="https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/100px/Basic.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/150px/Basic.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/250px/Basic.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/350px/Basic.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/500px/Basic.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/600px/Basic.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/Noel/Catgirl/Hairband/brown/900px/Basic.webp 900w">
      <div class="avatarSpineContainer hide"><canvas class="avatarSpine"></canvas></div>
  </div>

 const currentUsername = "<your username>";

 const users = [
 ...
 ,{
     username: "<your username>",
     background: "https://cdn.animemusicquiz.com/v1/backgrounds/250px/noel_catgirl_brown_vert.webp",
     avatarName: "Noel",
     avatarVarient: "Catgirl",
     avatarProp: "Hairband",
     avatarColor: "brown"
 }
];

 Note: avatar height is determined by your currently equipped avatar

*/

  const currentUsername = "<your username>";

  const users = [
    {
      username: "Riaru_",
      background:
        "https://cdn.animemusicquiz.com/v1/backgrounds/svg/Hibiki_standard_purple_vert.svg",
      avatarName: "Kumiko",
      avatarVarient: "Standard",
      avatarProp: "Hat",
      avatarColor: "aconitum",
    },
    //Example user: ,
    //{
    //    username: "<your username>",
    //    background: "<background>",
    //    avatarName: "<name>",
    //    avatarVarient: "<varient>",
    //    avatarProp: "<prop>",
    //    avatarColor: "<color>"
    //}
  ];

  const avatarSets = users.map((user) => ({
    username: user.username,
    head: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Head.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Head.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Head.webp 250w`,
    background: user.background,
    sets: {
      base: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Basic.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Basic.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Basic.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Basic.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Basic.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Basic.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Basic.webp 900w`,
      think: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Thinking.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Thinking.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Thinking.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Thinking.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Thinking.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Thinking.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Thinking.webp 900w`,
      wait: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Waiting.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Waiting.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Waiting.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Waiting.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Waiting.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Waiting.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Waiting.webp 900w`,
      noAnswer: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Confused.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Confused.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Confused.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Confused.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Confused.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Confused.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Confused.webp 900w`,
      correct: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Right.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Right.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Right.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Right.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Right.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Right.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Right.webp 900w`,
      wrong: `https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/100px/Wrong.webp 100w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/150px/Wrong.webp 150w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/250px/Wrong.webp 250w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/350px/Wrong.webp 350w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/500px/Wrong.webp 500w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/600px/Wrong.webp 600w,https://cdn.animemusicquiz.com/v1/avatars/${user.avatarName}/${user.avatarVarient}/${user.avatarProp}/${user.avatarColor}/900px/Wrong.webp 900w`,
    },
  }));

  // Custom image sets example
  //avatarSets.push(
  //    {
  //        username: "<your username>",
  //        head: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //        background: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //        sets: {
  //            base: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //            think: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //            wait: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //            noAnswer: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //            correct:  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo",
  //            wrong: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dcb31f9-bbbb-47c8-addc-95743576231b/ddu28jg-f48e3327-b079-46a9-bad3-cc6d2ceb6661.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkY2IzMWY5LWJiYmItNDdjOC1hZGRjLTk1NzQzNTc2MjMxYlwvZGR1MjhqZy1mNDhlMzMyNy1iMDc5LTQ2YTktYmFkMy1jYzZkMmNlYjY2NjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hIJqAwh2JgdSgtJ5-Ln7LfHKAoxcwiiEOg0kHRoD4Uo"
  //        }
  //    }
  //)

  const currentUser = avatarSets.find(
    (user) => user.username === currentUsername
  );
  const userMap = new Map(avatarSets.map((user) => [user.username, user]));
  const avatarContainer = document.querySelector("#qpAvatarRowAvatarContainer");
  const lobbyContainer = document.querySelector("#lobbyAvatarContainer");

  const observer = new MutationObserver((mutations) => {
    // Filter out irrelevent changes
    mutations = mutations.filter(
      (mutation) =>
        mutation.attributeName === "class" &&
        (mutation.target.matches("img.avatarImage") ||
          mutation.target.matches(".qpAvatarContainerOuter"))
    );

    if (mutations.length === 0) {
      return;
    }

    // Get Relevent Elements
    const gameAvatars = Array.from(
      avatarContainer.querySelectorAll(".qpAvatarContainerOuter")
    );
    const backgroundContainers = Array.from(
      avatarContainer.querySelectorAll(".qpAvatarBackgroundContainer")
    );
    const lobbyAvatars = Array.from(
      lobbyContainer.querySelectorAll(".lobbyAvatar")
    );

    mutations.forEach((mutation) => {
      // Update full profile
      gameAvatars.forEach((container, index) => {
        const containerUser =
          container.querySelector(".qpAvatarName").textContent;
        const user = userMap.get(containerUser);

        if (user) {
          const avatarImage = container.querySelector(".avatarImage");
          const containerClass = Array.from(container.classList).find((cls) =>
            Object.keys(user.sets).includes(cls)
          );

          avatarImage.setAttribute("srcset", user.sets[containerClass]);

          const backgroundContainer = backgroundContainers[index];
          if (backgroundContainer) {
            backgroundContainer.style.backgroundImage =
              "url(" + user.background + ")";
          }
        }
      });

      // Update Lobby Avatar
      lobbyAvatars.forEach((lobbyAvatar) => {
        const lobbyAvatarUser = lobbyAvatar.querySelector(
          ".lobbyAvatarNameContainerInner h2"
        ).textContent;
        const user = userMap.get(lobbyAvatarUser);
        if (user) {
          const lobbyAvatarImage = lobbyAvatar.querySelector(".avatarImage");
          lobbyAvatarImage.setAttribute("srcset", user.head);
        }
      });
    });

    // Update Corner Profile
    const avatarUserImg = document.querySelector(
      "#avatarUserImgContainerInner > .avatarImage"
    );
    avatarUserImg.setAttribute("srcset", currentUser.head);
  });

  observer.observe(avatarContainer, { attributes: true, subtree: true });
  observer.observe(lobbyContainer, { attributes: true, subtree: true });
})();
