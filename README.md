<div align="center">
  <h1>
		Event Coiler  
	  <a href="https://www.emojione.com/emoji/1f40d">
	    <img height="40" width="40" alt="snake coiled" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/emojione/151/snake_1f40d.png" />
	  </a>
  </h1>
</div>

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/jonmajorc/event-coiler.svg?branch=master)](https://travis-ci.org/jonmajorc/event-coiler)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## The Problem
You need to provide structure, definition, and reuse around events that happen throughout an application. You need the ability to configure with any package or internal solution also.

## The Solution
Use Event Coiler to enable structure, defintion, and reuse around your events. This is the solution that helped me create structure, defintion, and reuse around Google Analytic Event's. With providing proper definition, the business is able to make sense of each event that's logged.

## Usage

Basic usage to how you can get started coiling your events!
```js
import coiler from 'event-coiler'

// Event interaction config. You probably want this in it's own file `interactions.config.js`
const config = `
  {
    "Dropdown": {
      "clicked": {
        "opened": "opened dropdown",
        "closed": "closed dropdown",
        "updated": "{{item}} was updated to {{uppercase(updated)}}",
      }
    }
  }
`

const gaCoilerSetup = new Coiler({
  emitter: (args) => {
    console.log(args.value) // todo list was updated to CLEAN ROOM
    console.log(args.emitter) // { ns: 'Dropdown.clicked' params: { item: 'todo list', updated: 'clean room' }
  },
  config,
  interpolation: {
    uppercase(value) {
      return value.toUpperCase()
    }
  },
  debug: true,
})

gaCoilerSetup.e('Dropdown.clicked', { item: 'todo list' updated: 'clean room' }) // todo list was updated to CLEAN ROOM
```

## Inspiration
After my first implementation, I found out this was very similar to [i18next](https://github.com/i18next/i18next). Then I used it to help pave the path for Even Coiler.

## Other Solutions
- [i18next](https://github.com/i18next/i18next) -- potential solution, but it's rather focused on translation.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/7799266?v=4" width="100px;"/><br /><sub><b>Jon Major</b></sub>](https://jonmajorc.me)<br />[💻](https://github.com/jonmajorc/event-coiler/commits?author=jonmajorc "Code") [💡](#example-jonmajorc "Examples") [📖](https://github.com/jonmajorc/event-coiler/commits?author=jonmajorc "Documentation") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!