# Jelajah Aman - Aplikasi Cuaca dan Kualitas Udara

Aplikasi Jelajah Aman adalah aplikasi mobile yang menampilkan informasi cuaca dan kualitas udara dengan dukungan mode offline-first menggunakan SQLite dan cache.

## Penjelasan Status Data Cache

Aplikasi ini mengimplementasikan tiga status data yang berbeda:

1. **Cache-segar**: Data yang disimpan di perangkat dengan umur kurang dari 30 menit. Data ini dianggap masih akurat dan tidak memerlukan pembaruan dari internet, sehingga aplikasi langsung menampilkannya tanpa memanggil API.

2. **Cache-basi**: Data yang disimpan di perangkat dengan umur lebih dari 30 menit. Aplikasi akan mencoba mengambil data terbaru dari internet, tetapi jika gagal (offline), data lama ini tetap ditampilkan dengan label peringatan bahwa data mungkin sudah usang.

3. **First-run offline**: Kondisi ketika pengguna membuka kota baru tanpa koneksi internet dan belum ada data tersimpan untuk kota tersebut. Dalam kondisi ini, aplikasi akan menampilkan pesan error dan tidak dapat menampilkan data.

Label status data ini sangat penting bagi pengguna karena memberikan transparansi tentang tingkat keakuratan dan kebaruan informasi yang mereka lihat. Pengguna berhak tahu apakah angka suhu dan kualitas udara yang ditampilkan adalah data real-time atau salinan lama, sehingga mereka dapat membuat keputusan yang tepat berdasarkan informasi tersebut.

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
