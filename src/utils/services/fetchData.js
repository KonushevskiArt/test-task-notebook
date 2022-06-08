const url = 'http://localhost:3002/notes';
const prodUrl = window.location.href + 'localhost:3002/notes'; 

export const fetchData = async () => {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
}