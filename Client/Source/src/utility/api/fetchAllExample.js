var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "X-Amz-Content-Sha256",
  "beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3"
);
myHeaders.append(
  "X-Amz-Security-Token",
  "IQoJb3JpZ2luX2VjECkaCXVzLWVhc3QtMSJIMEYCIQCduIHv+nxP2DwE8ORMeyW7/WK6tNDrYllaVuyBW1YPYgIhAP5ypr+kc8UI+B/Xr+vYPkjDNqKejhByElEaopujD/y/KsgCCCEQAxoMMjg0MjExMzQ4MzM2IgxtmElyJd+e5G4ntTgqpQLHnH3eGUh8aEGx6BSH46eVbp0u1NcryP3POJle7FYBPmuuezFN81mA5tDpIex1sIMbw+ykIQVHXLZSlniOLQIC3fv/mIH8zvrI8/4bl6yWA/+kUd+XpQyTf+i6vL4IAktxA9Xm2ZTAe1Gihq4/PdvE1YyITp2RVd4rBol3p3FltSidGtR/ySBnr0LCb9D/p1z24enqfBQTjhhTSOJ4tGFzUBYXuBJVIOHAZnS8jfspsE1VflMgWc6In5ZU6HNr/u40D0eHFhQz7mSIx1ysFarMkHcRatA8SgimVbK2t4fezPdN9p4CVXm/9mQ/M6pPTL73ksWoHk9c750R2Gd6JNw21Gl9urM4hl1E+3bamCbyak7dUptLpFPJKBlGg4uB/kbwbbFhKjCZ2omOBjqhAUSGlO171f1z/6PQJdW2xn+OaW08hL8M5+8jgF0sxcyrrZhDRWYI5df1QUcii2T2qtcJpVmsYAeuxGSe7mPvmvXXM5epZDY2tPXHKgSl9/QUsuzasHN/i4lxxQkjLko5GzuN8khzP3TQZm2rutZT1tI/hSZBqtGzlGZfKYMAlnYpSfO/K3YtTeYgaX5YE1is4MUw9JA7o8myyJvwBzJBdpvb"
);
myHeaders.append("X-Amz-Date", "20211222T005751Z");
myHeaders.append(
  "Authorization",
  "AWS4-HMAC-SHA256 Credential=ASIAUELCRANYAVNDCDEW/20211222/us-east-1/es/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date;x-amz-security-token, Signature=f6bde082145b3e6a0ebef0ef27b2ca0cc9c10bcf57978f59a7a569cfb71db20a"
);
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append(
  "Access-Control-Allow-Headers",
  "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
);
myHeaders.append("Access-Control-Allow-Methods", "GET, PUT, POST");

var raw = JSON.stringify({
  query: {
    match_all: {},
  },
});

var requestOptions = {
  method: "GET",
 // headers: myHeaders,
 // body: raw,
  redirect: "follow",
};

const fetchAllExample = () => {
  fetch("api/es/search", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default fetchAllExample;
