13 Build RN app without Expo



Expo may not support some 3rd party package, in this case you would need to build RN app without Expo



# Abstract









# Intro

## How does Expo work?

Expo Go App provides shared native runtime on mobile device

+ we don't build real app executable during development. Instead, our code is injected into the Expo Go client app and executed there, which is convenient in development environment



We are still able to build and publish standalone app without Expo Go app (but for production environment)

+ use EAS Build Service



几种Workflow:

+ Expo "Managed Workflow" (extensively used in this course)
  + easy to set up & work with
  + Quick frictionless dvelopment
  + No or very little configuration required
  + you can build (cross-platform) standalone apps

+ Expo "Bare Workflow" -> cannot use Expo Go app (we will look at later)
  + relatively easy to set up & work with
  + Convenient development
  + some configuration required
  + You can build (cross-platform) standalone apps

+ Not use Expo at all -> React Native CLI (we will look at this later)

  + more complex setup

  + convenient development

  + Can require more configuration efforts when adding 3rd party native dependencies

  + Standalone apps are built locally

    



:pencil: [Expo managed workflow vs. bare workflow](./sub_topics/expo_workflow.md)



## Using Expo bare workflow









## Using React Native CLI (no Expo)











