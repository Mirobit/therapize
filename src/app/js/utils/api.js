import axios from "axios";

const bodyRequest = (type, endpoint, body, files, uploadProgress) => {
  return new Promise((resolve, reject) => {
    let data;

    if (files) {
      data = new FormData();

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      Object.keys(files).forEach(key => {
        data.append(key, files[key]);
      });
    } else {
      data = body;
    }

    axios[type](endpoint, data, {
      headers: localStorage.getItem("identity") && {
        Authorization: `Bearer ${localStorage.getItem("identity")}`
      },
      onUploadProgress:
        uploadProgress && typeof uploadProgress === "function" ? uploadProgress : undefined
    })
      .then(result => resolve(result.data))
      .catch(err => {
        if (err && err.response && err.response.data && err.response.data.error) {
          err.description = err.response.data.error;
          reject(err);
        } else {
          reject(err);
        }
      });
  });
};

const api = {
  get: endpoint => {
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, {
          headers: localStorage.getItem("identity") && {
            Authorization: `Bearer ${localStorage.getItem("identity")}`
          }
        })
        .then(result => resolve(result.data))
        .catch(err => {
          if (err && err.response && err.response.data && err.response.data.error) {
            err.description = err.response.data.error;
            reject(err);
          } else {
            reject(err);
          }
        });
    });
  },

  post: (endpoint, body, files, uploadProgress) =>
    bodyRequest("post", endpoint, body, files, uploadProgress),
  put: (endpoint, body, files, uploadProgress) =>
    bodyRequest("put", endpoint, body, files, uploadProgress),
  patch: (endpoint, body, files, uploadProgress) =>
    bodyRequest("patch", endpoint, body, files, uploadProgress),
  delete: (endpoint, body, files, uploadProgress) =>
    bodyRequest("delete", endpoint, body, files, uploadProgress)
};

export default api;
