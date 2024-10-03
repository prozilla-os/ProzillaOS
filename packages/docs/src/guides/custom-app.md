---
outline: deep
---

# Making a custom app

There are two main ways to create custom applications for ProzillaOS:

1. [Internal app](#internal-app)
2. [External app](#external-app)

An internal app lives inside the same repository as the OS itself. An external app has a separate repository and must therefore also be published to a package directory, like npm, before being usable in a ProzillaOS project. The internal app approach is the simplest one and easiest one to set up, while the other approach is a bit more technical.

## 1. Internal app {#internal-app}

### Prerequisites

This guide assumes you have already set up a basic project that implements ProzillaOS. You can use to [getting started guide](/guides/getting-started) to set up a project with ProzillaOS.

### Setup

Create a new folder where you can put the source code of your custom ProzillaOS application.

## 2. External app {#external-app}

### Prerequisites

This guide assumes you have already set up a basic React project with TypeScript. To learn more about how to set up a React project, check out the official [React documentation](https://react.dev/learn/start-a-new-react-project). The React documentation also has a guide on [how to start using TypeScript in your React project](https://react.dev/learn/typescript).

### Setup
