## 프로젝트명

MBTI-TEST

## 배포 링크

[mbti-test-app-omega.vercel.app](https://mbti-test-app-omega.vercel.app/)

## 프로젝트 구조

```
mbti-test-app
├─ db.json
├─ eslint.config.js
├─ index.html
├─ package.json
├─ postcss.config.js
├─ public
│  └─ icon.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ auth.js
│  │  └─ testResults.js
│  ├─ App.jsx
│  ├─ axiosInstances
│  │  ├─ authInstance.js
│  │  └─ testInstance.js
│  ├─ components
│  │  ├─ AuthForm.jsx
│  │  ├─ Layout.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ TestForm.jsx
│  │  ├─ TestResultItem.jsx
│  │  └─ TestResultList.jsx
│  ├─ data
│  │  └─ questions.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ Profile.jsx
│  │  ├─ Signup.jsx
│  │  ├─ TestPage.jsx
│  │  └─ TestResultPage.jsx
│  ├─ shared
│  │  └─ Router.jsx
│  ├─ utils
│  │  └─ mbtiCalculator.jsx
│  └─ zustand
│     └─ userStore.js
├─ tailwind.config.js
├─ vercel.json
├─ vite.config.js
└─ yarn.lock

```

## 구현 기능

<details>
  <summary>메인</summary>

<img src="https://github.com/user-attachments/assets/0681417d-c202-41b7-b81c-59029eb6e995" width="800" height="500"/>

</details>
<details>
  <summary>로그인</summary>

<img src="https://github.com/user-attachments/assets/6990d136-3db4-4f3b-8484-35516520ed2c" width="300" height="200"/>

</details>
<details>
  <summary>회원가입</summary>

<img src="https://github.com/user-attachments/assets/4a99bfa0-e37c-4bc9-9516-4da2358f45d7" width="300" height="200"/>

</details>
<details>
  <summary>프로필</summary>

<img src="https://github.com/user-attachments/assets/57cf54f2-1fde-42c0-a9ef-7afb91a598e0" width="300" height="200"/>

</details>
<details>
  <summary>테스트</summary>

<img src="https://github.com/user-attachments/assets/ce2c2b07-96b0-4724-9b06-29f30a4461ba" width="300" height="600"/>

</details>
<details>
  <summary>테스트 결과</summary>

<img src="https://github.com/user-attachments/assets/a0b31000-5c57-45cd-a7b5-86837324da81" width="500" height="500"/>

</details>

## 트러블 슈팅

1. 🤢 회원 정보 수정 실패
   <img src="https://github.com/user-attachments/assets/d90531af-f5cb-49b2-a049-84b58c26d3dd" width="500" height="300"/>

</br>
사용자의 닉네임을 변경하는 기능에 장애가 생겼다.</br>
원인을 찾기 위해 해당 기능을 처리하는 코드를 보면 아래와 같다.

</br>

```
export const updateProfile = async (nickname, accessToken) => {
  const {data} = await authInstance.patch("/profile", nickname, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: Bearer ${accessToken},
    },
  })
  return data;
}
```

</br>

원인은 nickname을 바로 authInstance.patch 함수의 두 번째 인자로 전달하고 있기 때문이었다.</br>
위 방식은 nickname 변수를 그대로 전달하기 때문에 Axios가 이를 객체로 처리하지 않고, 문자열로 처리하려고 시도한다. 즉, nickname을 단순한 문자열로 취급하여 API 요청의 body에 제대로 반영되지 않아 서버에서 처리할 수 없는 형태가 된 것이다.

📌이를 토대로 수정된 코드는 아래와 같다.
</br>

```
export const updateProfile = async (nickname, accessToken) => {
  const {data} = await authInstance.patch("/profile", {nickname}, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: Bearer ${accessToken},
    },
  })
  return data;
}
```

</br>

수정된 코드에서는 {nickname} 형태로 전달되므로, nickname이 객체의 프로퍼티로 전달된다. 서버에서는 보통 body 데이터를 JSON 형식으로 받기 때문에 {nickname} 형태로 전달해야 데이터를 올바르게 처리할 수 있다.
</br>

<img src="https://github.com/user-attachments/assets/092378b2-0036-4011-b986-4c423dd9288f" width="500" height="300"/>

</br>

2. 🤢 로그인 했지만 user 정보가 null 상태

```
const { setUser } = userStore();
  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      if (response.success) {
        alert("로그인 성공!");
        setUser(response);
        navigate("/");
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.log("error => ", error);
    }
  };
```

위 코드는 로그인 페이지에서 로그인 기능을 하는 코드이다.</br>
사용자에게 입력 받은 정보를 가지고 서버에 로그인 요청을 보낸 후 요청이 성공하면 아래와 같이 응답이 오고 그 응답으로 setUser를 통해 user를 변경시킨다.

</br>
<img src="https://github.com/user-attachments/assets/ac3ade08-3930-457b-bd8a-4a81dc95a76e" width="500" height="300"/>

</br>
개발자 도구의 네트워크 탭을 이용해 요청은 성공했지만 응답이 user에 담기지 않는다는 것을 알았다.

</br>

그럼 응답을 setUser 시켜주는 로직의 코드를 살펴보겠다.

</br>

```
import { create } from "zustand";

const userStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser))
        set({ newUser })
    }
}));

export default userStore;
```

원인은 set({ newUser }) 부분이었고, 위 코드는 newUser라는 새로운 상태 프로터티를 생성하고 newUser라는 이름의 키를 추가하려고 하게 된다. 하지만 나의 의도는 기존의 user 상태를 업데이트하려는 의도였으므로 잘못된 키가 사용된 거이고 상태 업데이트가 제대로 이루어지지 않은 것이다.

</br>

수정된 코드는 아래와 같다.

```
import { create } from "zustand";

const userStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser))
        set({ user: newUser })
    }
}));

export default userStore;
```

위 코드는 처음 내 의도대로 set함수에 {user: newUser}를 전달하고, 기존 user를 newUser 값으로 업데이트한다.</br>
</br>
아래는 코드 수정 후 user가 잘 확인되어지는 모습이다.
</br>
<img src="https://github.com/user-attachments/assets/ffc11eb9-70b6-44d1-9679-1a59b7a83a61" width="500" height="300"/>

## 개발 환경

|                                                     사용언어                                                     |                                                                                                                                            프레임워크 및 라이브러리                                                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" /> | <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> |

## 소감

Zustand와 TanStack Query를 처음 사용해 보았는데 Zustand는 직관적이고 사용이 편리했고,</br>
TanStack Query는 캐싱, 에러 핸들링, 로딩 상태 관리 등 비동기 데이터 처리를 간결하게 할 수 있어서 편리했다.</br>
</br>
아쉬운 점은 TanStack Query를 사용하는 부분이 중복되는 코드가 많았는데, 이를 Custom Hook으로 만들었다면 가독성이나 유지보수가 훨씬 용이했을 것이라는 생각이 들었다.
