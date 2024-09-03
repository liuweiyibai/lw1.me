

export default defineNuxtPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('content:file:beforeParse', (file) => {
    console.log(file,2222)
    if (!/---[\s\S]*_path[\s\S]*---/.test(file.body)) {
      file.body = file.body.replace(
        /---/,
        '---'
          .concat('\n')
          .concat('_path: ')
          .concat(file._id.replace('content', '').split(':').join('/'))
      );
    }
  });
});
