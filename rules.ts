import fs from "fs";
import os from "os";
import { KarabinerRules, KeyCode } from "./types";
import {
  createHyperSubLayers,
  app,
  open,
  rectangle,
  shell,
} from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself (Shift + Command + Option)
  {
    description: "Hyper Key (⇧⌘⌥ = Shift + Command + Option)",
    manipulators: [
      // Left Shift with Left Command + Left Option held -> Set Hyper
      {
        description: "Left Shift + Left Command + Left Option -> Hyper Key",
        type: "basic",
        from: {
          key_code: "left_shift",
          modifiers: {
            mandatory: ["left_command", "left_option"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      // Left Command with Left Shift + Left Option held -> Set Hyper
      {
        description: "Left Command + Left Shift + Left Option -> Hyper Key",
        type: "basic",
        from: {
          key_code: "left_command",
          modifiers: {
            mandatory: ["left_shift", "left_option"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      // Left Option with Left Shift + Left Command held -> Set Hyper
      {
        description: "Left Option + Left Shift + Left Command -> Hyper Key",
        type: "basic",
        from: {
          key_code: "left_option",
          modifiers: {
            mandatory: ["left_shift", "left_command"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      // Right Shift with Right Command + Right Option held -> Set Hyper
      {
        description: "Right Shift + Right Command + Right Option -> Hyper Key",
        type: "basic",
        from: {
          key_code: "right_shift",
          modifiers: {
            mandatory: ["right_command", "right_option"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      // Right Command with Right Shift + Right Option held -> Set Hyper
      {
        description: "Right Command + Right Shift + Right Option -> Hyper Key",
        type: "basic",
        from: {
          key_code: "right_command",
          modifiers: {
            mandatory: ["right_shift", "right_option"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      // Right Option with Right Shift + Right Command held -> Set Hyper
      {
        description: "Right Option + Right Shift + Right Command -> Hyper Key",
        type: "basic",
        from: {
          key_code: "right_option",
          modifiers: {
            mandatory: ["right_shift", "right_command"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // Hyper + Enter / 1 -> WezTerm
    return_or_enter: app("WezTerm"),
    "1": app("WezTerm"),
    "2": app("Google Chrome"),
    "3": app("Zed"),
    "4": app("Finder"),
    "5": app("Spotify"),
    "6": app("Slack"),
    "7": app("Discord"),
    "8": app("Notion"),
    "9": app("Texts"),
    // b = "B"rowse
    b: {
      // Quarterly "P"lan
      // p: open("https://mxstbr.com/cal"),
      r: open("https://reddit.com"),
    },
    // x = "Open" applications (moved from 'o')
    x: {
      d: app("Discord"),
      s: app("Slack"),
      e: app("Superhuman"),
      // a: app("iA Presenter"),
      // "W"hatsApp has been replaced by Texts
      // l: open(
      //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
      // ),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // j = "Window" via rectangle.app (moved from 'w' to make room for desktop switching)
    j: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // e: open(
      //   `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      // ),
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_option"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // k = "Raycast" (moved from 'r' to make room for desktop switching)
    k: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://script-commands/dismiss-notifications"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
  }),
  // {
  //   description: "Change Backspace to Spacebar when Minecraft is focused",
  //   manipulators: [
  //     {
  //       type: "basic",
  //       from: {
  //         key_code: "delete_or_backspace",
  //       },
  //       to: [
  //         {
  //           key_code: "spacebar",
  //         },
  //       ],
  //       conditions: [
  //         {
  //           type: "frontmost_application_if",
  //           file_paths: [
  //             "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const karabinerConfigPath = process.env.KARABINER_CONFIG_PATH || 
  `${process.env.HOME || os.homedir()}/.config/karabiner/karabiner.json`;

const config = JSON.stringify(
  {
    global: {
      show_in_menu_bar: false,
    },
    profiles: [
      {
        name: "Default profile",
        complex_modifications: {
          rules,
        },
      },
    ],
  },
  null,
  2
);

// Write to both locations: project directory (for git) and actual config location
fs.writeFileSync("karabiner.json", config);
fs.writeFileSync(karabinerConfigPath, config);

console.log(`✓ Configuration written to: ${karabinerConfigPath}`);
console.log(`✓ Configuration also written to: karabiner.json`);
