import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda, leo } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Installation',
  date: '31 July 2017',
  authors: [arunoda, leo],
})(markdown(components)`

In order to deploy something, you need at least one of our applications: Now Desktop and/or Now CLI (the perfect
scenerio is both being installed).

This page will guide you through the differences and why both clients matter.

## Now Desktop (Recommended)

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/installation/now-desktop.png`}
    width={550}
    height={380}
    caption="Now Desktop on macOS"
  />
}

This is a desktop app which is [available](https://zeit.co/download) for all of the major operation systems. It comes as an operation system status bar app.

You can deploy apps, see notifications, and manage your account using an easy-to-use interface.
It will update new versions automatically behind the scenes and you can always use the latest version of [Now Desktop](https://zeit.co/download).

In addition, it provides you with the ability to easily install Now CLI, which will then be kept up-to-date automatically.

## Now CLI

Our command line interface provides you with the biggest range of features and lets you interact with
our platform using commands.

It is also the ideal way to interact with ${<Now color="#000"/>} inside Continues Integration (CI) services.

You can install it like this...

${
  <TerminalInput>npm install -g now</TerminalInput>
}

...or [download the binaries](https://zeit.co/download#command-line) directly.

## Open Source

All of these apps are available under the open source MIT license. So, you can always check the source code and modify it as needed.
You are always welcome to suggest new features and submit issues. Use following repositories:

* Now Desktop - <https://github.com/zeit/now-desktop>
* Now CLI - <https://github.com/zeit/now-cli>
* Now Client - <https://github.com/zeit/now-client>

`)
