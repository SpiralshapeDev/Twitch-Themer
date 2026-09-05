// Copyright 2025 SpiralDev
// Licensed under the Apache License, Version 2.0
// See LICENSE file for details.

function ModifyHexColor(hex, r, g, b, a = 0) {
  if (hex == null) {
    console.error(`Failed to convert hex: ${hex} by r:${r}, g:${g}, b:${b}, a:${a}`)
    return hex;
  }
  hex = hex.replace('#', '');

  let red = parseInt(hex.substring(0, 2), 16);
  let green = parseInt(hex.substring(2, 4), 16);
  let blue = parseInt(hex.substring(4, 6), 16);
  let alpha = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255;

  red = Math.max(0, red + r);
  green = Math.max(0, green + g);
  blue = Math.max(0, blue + b);
  alpha = Math.max(0, alpha + a);

  const toHex = n => n.toString(16).padStart(2, '0');

  return '#' + toHex(red) + toHex(green) + toHex(blue) + (hex.length === 8 ? toHex(alpha) : '');
}

function RefreshTheme() {
  Modify_Property('--twitch_themer_main_color', getCookie("twitch_theme_color"));
  Modify_Property('--twitch_themer_text_color', getCookie("twitch_text_color"));
  Modify_Property('--twitch_themer_twitch_color', getCookie("twitch_twitch_color"));

  Modify_Property('--color-twitch-purple-1', ModifyHexColor(twitch_color,-141,-70,-246));
  Modify_Property('--color-twitch-purple-2', ModifyHexColor(twitch_color,-132,-68,-227));
  Modify_Property('--color-twitch-purple-3', ModifyHexColor(twitch_color,-124,-66,-209));
  Modify_Property('--color-twitch-purple-4', ModifyHexColor(twitch_color,-110,-62,-177));
  Modify_Property('--color-twitch-purple-5', ModifyHexColor(twitch_color,-94,-59,-145));
  Modify_Property('--color-twitch-purple-6', ModifyHexColor(twitch_color,-76,-55,-108));
  Modify_Property('--color-twitch-purple-7', ModifyHexColor(twitch_color,-53,-49,-58));
  Modify_Property('--color-twitch-purple-8', ModifyHexColor(twitch_color,-26,-27,0));
  Modify_Property('--color-twitch-purple-9', twitch_color);
  Modify_Property('--color-twitch-purple-10', ModifyHexColor(twitch_color,24,41,0));
  Modify_Property('--color-twitch-purple-11', ModifyHexColor(twitch_color,46,77,0));
  Modify_Property('--color-twitch-purple-12', ModifyHexColor(twitch_color,64,108,0));
  Modify_Property('--color-twitch-purple-13', ModifyHexColor(twitch_color,82,138,0));
  Modify_Property('--color-twitch-purple-14', ModifyHexColor(twitch_color,92,153,0));
  Modify_Property('--color-twitch-purple-15', ModifyHexColor(twitch_color,98,164,0));

  Modify_Property('--color-background-float', theme_main_color); // 4/4 Bright (max)
  Modify_Property('--color-background-alt', ModifyHexColor(theme_main_color,-8,-8,-8,0)); // 3/4 Bright (high)
  Modify_Property('--color-background-base', ModifyHexColor(theme_main_color,-25,-25,-25,0)); // 2/4 Bright (mid)
  Modify_Property('--color-background-body', ModifyHexColor(theme_main_color,-35,-35,-35,0)); // 1/4 Bright (dark)

  Modify_Property('--color-text-alt-2', ModifyHexColor(text_color,-15,-15,-15,0));
  Modify_Property('--color-opac-gd-2', ModifyHexColor(text_color,-30,-30,-30,0));

  Add_Custom_Style(`
        .bXENUW
        {
            color : ${ModifyHexColor(text_color,10,10,10,0)} !important;
        }
        `,"twitch"
  )
}

function Modify_Property(id,value) {
  document.documentElement.style.setProperty(id,value);
}

function Add_Custom_Style(style,id) {
  const elements = document.querySelectorAll(`#twitch_themer--${id}`);
  elements.forEach(el => el.remove());

  const styleEl = document.createElement("style");
  styleEl.id = `twitch_themer--${id}`;
  styleEl.textContent = style;
  document.head.appendChild(styleEl);
}