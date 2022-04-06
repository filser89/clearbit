// TODO
// what will our fetch method look like?
// - What is the URL to fetch
// - How to path the Auth token

// fetch(url, {options})
// options
// {
//     headers: {

//     },
//     method: '',
//     body: JSON.stringify({})
// }
const authorization = "sk_e1a0cfd979c5f229e144c5a648dfbb5b";
const url = "https://person.clearbit.com/v2/people/find?email=";

const form = document.querySelector("#clearbitForm");

const getUserInput = () => {
  const emailInput = form.querySelector("#clearbitEmail");
  return emailInput.value;
};

const showUserData = (data) => {
  //   const userName = document.getElementById("userName");
  //   const userEmail = document.getElementById("userEmail");
  //   const userBio = document.getElementById("userBio");
  //   const userLocation = document.getElementById("userLocation");
  //   userName.innerText = data.name.fullName;
  //   userEmail.innerText = data.email;
  //   userBio.innerText = data.bio;
  //   userLocation.innerText = data.location;
  const ids = ["userName", "userEmail", "userBio", "userLocation"];
  const values = [data.name.fullName, data.email, data.bio, data.location];
  ids.forEach((id, index) => {
    replaceElementInnerTextById(id, values[index]);
  });
};

const showNotFound = () => {
  const ids = ["userName", "userEmail", "userBio", "userLocation"];
  ids.forEach((id) => replaceElementInnerTextById(id, "Not found"));
};

const replaceElementInnerTextById = (id, replaceValue) => {
  const element = document.getElementById(id);
  element.innerText = replaceValue;
};

const displayUserData = (requestUrl) => {
  fetch(requestUrl, {
    headers: { Authorization: `Bearer ${authorization}` },
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
      //   if (data.email) {
      //     showUserData(data);
      //   } else {
      //     showNotFound();
      //   }
      data.email ? showUserData(data) : showNotFound();
    })
  );
};
form.addEventListener("submit", (event) => {
  // prevent default prevents the default behaivior triggered by submition of the form.
  // default behavior is to redirect to the url that is stated in 'action' attribute of a form or to refresh the page if action attribute is missing or empty
  event.preventDefault();
  // collecting user input
  const email = getUserInput();
  //   making an asyncronous HTTP request to clearbit API
  const requestUrl = `${url}${email}`;

  displayUserData(requestUrl);
});
