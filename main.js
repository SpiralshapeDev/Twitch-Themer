// Copyright 2025 SpiralDev
// Licensed under the Apache License, Version 2.0
// See LICENSE file for details.

const fetchedThemeColor = getCookie("twitch_theme_color");
let theme_main_color = (fetchedThemeColor !== null) ? fetchedThemeColor :   setCookie("twitch_theme_color", "#3b3b44"); // Theme color default
const fetchedTextColor = getCookie("twitch_text_color");
let text_color = (fetchedTextColor !== null) ? fetchedTextColor :           setCookie("twitch_text_color", "#efeff1"); // Theme text color default
const fetchedTwitchColor = getCookie("twitch_twitch_color");
let twitch_color = (fetchedTwitchColor !== null) ? fetchedTwitchColor :     setCookie("twitch_twitch_color", "#9147ff"); // Theme Twitch color default

function setCookie(key,value) {
    document.cookie = `${key}=${value}; path=/; domain=.twitch.tv; max-age=${60*60*24*365}`;
    return value;
}

function getCookie(key) {
    const match = document.cookie.match(
        new RegExp(`(^|;)\\s*${key}=([^;]*)`)
    );
    return match ? match[2] : null;
}

RefreshTheme();

// .grEvEK.Layout-sc-1xcs6mc-0: Homepage 3 dots
// .jxkgRN: Settings page subpage title text box
let buttonParentFallOrder = ['.grEvEK.Layout-sc-1xcs6mc-0', '.jxkgRN']
let container = null;

for (let selector of buttonParentFallOrder) {
  container = document.querySelector(selector);
  if (container) break;
}
if (!container) {
  throw new Error("{TwitchThemer} Critical error: Failed to find any container for button");
}
// container is guaranteed to not be null after this point

if (container.firstChild) {
    let colorInput;
    let label;

    // Button/GUI
    const themer_button = document.createElement('themer_button');
    themer_button.textContent = "Themer";
    themer_button.id = 'themer_button';

    const themer_gui = document.createElement('div');
    themer_gui.id = 'themer_gui';
    themer_gui.style.display = "none";
    document.body.appendChild(themer_gui);

    themer_button.addEventListener('click', () => {
        const rect = themer_button.getBoundingClientRect();
        themer_gui.style.position = "fixed";
        themer_gui.style.top = rect.bottom + 5 + "px";
        themer_gui.style.left = rect.left + "px";
        themer_gui.style.display = themer_gui.style.display === "none" ? "block" : "none";
    });

    document.addEventListener('click', (event) => {
        const isClickInsideGUI = themer_gui.contains(event.target);
        const isClickOnButton = themer_button.contains(event.target);

        if (!isClickInsideGUI && !isClickOnButton) {
            themer_gui.style.display = "none";
        }
    });


    // BG Hex Picker

    const theme_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'theme_hex_picker';
    colorInput.name = 'theme_hex_picker';
    colorInput.value = theme_main_color;

    label = document.createElement('label');
    label.htmlFor = 'theme_hex_picker';
    label.textContent = 'Theme Color';

    theme_hex_picker.appendChild(colorInput);
    theme_hex_picker.appendChild(label);
    theme_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(theme_hex_picker);

    const themeColorInput = theme_hex_picker.querySelector('#theme_hex_picker');
    themeColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_theme_color",selectedColor);

        theme_main_color = selectedColor;
        themer_gui.style.background = selectedColor;
        themer_button.style .background = selectedColor;
        RefreshTheme();
    });


    // Text Hex Picker

    const text_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'text_hex_picker';
    colorInput.name = 'text_hex_picker';
    colorInput.value = text_color;

    label = document.createElement('label');
    label.htmlFor = 'text_hex_picker';
    label.textContent = 'Text Color';

    text_hex_picker.appendChild(colorInput);
    text_hex_picker.appendChild(label);
    text_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(text_hex_picker);

    const textColorInput = text_hex_picker.querySelector('#text_hex_picker');
    textColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_text_color",selectedColor);

        text_color = selectedColor;
        RefreshTheme();
    });


    // Text Hex Picker

    const twitch_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'twitch_hex_picker';
    colorInput.name = 'twitch_hex_picker';
    colorInput.value = twitch_color;

    label = document.createElement('label');
    label.htmlFor = 'twitch_hex_picker';
    label.textContent = 'Twitch Color';

    twitch_hex_picker.appendChild(colorInput);
    twitch_hex_picker.appendChild(label);
    twitch_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(twitch_hex_picker);

    const twitchColorInput = twitch_hex_picker.querySelector('#twitch_hex_picker');
    twitchColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_twitch_color",selectedColor);

        twitch_color = selectedColor;
        RefreshTheme();
    });

    container.after(themer_button);

    document.body.appendChild(themer_gui);
}