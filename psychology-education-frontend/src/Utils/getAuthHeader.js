export default function getAuthHeader() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
