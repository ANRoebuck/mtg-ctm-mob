Increment version and versionCode in app.json

Run expo doctor and fix any issues

```
npx expo-doctor
```

Ensure logged into eas

```
npm install -g eas-cli
eas login
```

Use eas to create build

```
eas build --platform android
```

See build logs and download completed .aab at https://expo.dev/ 

Upload new .aab to google play console https://play.google.com/console

`Test and release -> Production -> Create new release`



NB: expo.dev offers "Workflow to build, submit and update on every push" - investigate