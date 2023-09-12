export const AppConfig = {
  apiUrl: 'http://localhost:8090/', //local
  // apiUrl: 'http://localhost:8080/', // docker
  cloudinaryApiPrefix: 'https://api.cloudinary.com/v1_1/',
  cloudinaryApiPostfix: '/image/upload',
  cloudinaryCloudName: 'ddzs2ixbq',
  cloudinaryAPIKey: '728923541341992',
  cloudinaryAppSecret: 'HfNKW41h75c-5gF_VOs3bquJ6tk',
  //   quill-editor config
  editorConfig: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // Basic formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      [{ indent: '-1' }, { indent: '+1' }], // Indentation
      [{ align: [] }], // Text alignment
      ['link', 'image', 'video'], // Links, images, and videos
      ['clean'], // Remove formatting
      // Custom formats (add your own)
      [{ header: 1 }, { header: 2 }], // Headers
      [{ color: [] }, { background: [] }], // Text and background color
      ['code-block'], // Code block
    ],
  },
};
