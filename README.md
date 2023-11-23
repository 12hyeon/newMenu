
<p align="center">
    <img src="https://allforyoung-homepage-maycan.s3.ap-northeast-2.amazonaws.com/uploads/post_photos/2022/07/21/b2b678a1cf6f4f1ba57442eb8eed47d0.jpg" width="500px">
</p>

# newMenu

>  농촌진흥청 식단관리 서비스를 활용한 사용자 맞춤형 식단 관리 서비스를 구현한 저장소입니다.

 <br>

# 목차

- [서비스 소개](#서비스-소개)
- [서비스 시나리오](#서비스-시나리오)
- [API](#API)
- [컬렉션 디자인](#컬렉션-디자인)
- [프로젝트 관리 및 회고](#프로젝트-관리-및-회고)

<br>

## 서비스 소개

이 서비스는 사용자의 알러지 정보와 기초대사량을 근거로 하여 맞춤형 식단을 추천하고, 칼로리 및 영양 정보를 제공하여 건강한 식습관을 유도하는 어플리케이션입니다.

<br>

## 서비스 시나리오
![서비스-시나리오](https://github.com/12hyeon/newMenu/assets/67951802/f512cdf1-14b2-4b1d-8ba1-ad31385fc89a)

<br>

## API

| Method | URL | 기능 |
|--------|-----|-----|
| POST   | users/signup | 회원가입 |
| POST   | users/login | 로그인 및 음식 추천 |
| GET    | foods/info | 음식 영양 정보 전달 |
| GET    | foods/search | 음식 검색 |
| GET    | /diets | 식단 정보 전달 |
| POST   | /diets | 식단 정보 저장 |

<br>

## 컬렉션 디자인

<details>
<summary>User 사용자 정보</summary>

| Column name                 | Type           | 설명           |
|-----------------------------|----------------|---------------|
| userId                      | String         | 아이디         |
| userPassword                | String         | 비밀번호       |
| email                       | [String]       | 이메일         |
| sex                         | [String]       | 성별(남:1, 여:2)|
| age                         | [String]       | 나이           |
| height                      | Number         | 키             |
| weight                      | Number         | 체중           |
| allergy                     | Number         | 알레르기       |
| basal                       | Number         | 기초대사량     |

<br>
</details>

<details>
<summary>Diet 식단 정보</summary>

| Column name                 | Type           | 설명           |
|-----------------------------|----------------|---------------|
| userId                      | String         | 아이디         |
| date                        | String         | 날짜           |
| break_diet                  | [String]       | 아침 식단      |
| lunch_diet                  | [String]       | 점심 식단      |
| dinner_diet                 | [String]       | 저녁 식단      |
| break_energy                | Number         | 아침 에너지 섭취량 |
| lunch_energy                | Number         | 점심 에너지 섭취량 |
| dinner_energy               | Number         | 저녁 에너지 섭취량 |
| total_energy                | Number         | 총 에너지 섭취량 |

<br>
</details>

<details>
<summary>Food 카테고리 식품 분류 정보</summary>

| Column name                 | Type           | 설명           |
|-----------------------------|----------------|---------------|
| fd_Code                     | String         | 음식 코드       |
| upper_Fd_Grupp_Nm           | String         | 대분류         |
| fd_Grupp_Nm_list            | String         | 중분류         |
| fd_Nm                       | String         | 소분류         |
| fd_Nm2                      | String         | 소분류 () 제외 |

<br>
</details>

<details>
<summary>Food 식품 세부 정보</summary>

| Column name                 | Type           | 설명           |
|-----------------------------|----------------|---------------|
| fd_Code                     | String         | 음식 코드       |
| upper_Fd_Grupp_Nm           | String         | 대분류         |
| fd_Grupp_Nm_list            | String         | 중분류         |
| fd_Nm                       | String         | 소분류         |
| fd_Nm2                      | String         | 소분류 () 제외 |
| fd_Wgh                      | Number         | 음식 무게       |
| allrgy_Info                 | Number         | 알레르기       |
| allrgy_Info2                | Number         | 알레르기 () 제외|
| energy_Qy                   | Number         | 에너지         |
| prot_Qy                     | Number         | 단백질         |
| ntrfs_Qy                    | Number         | 지질           |
| carbohydrate_Qy             | Number         | 탄수화물       |
| sugar_Qy                    | Number         | 당류           |
| fafref_Qy                   | Number         | 지방산         |
| fasatf_Qy                   | Number         | 포화 지방산    |
| clci_Qy                     | Number         | 칼슘           |
| na_Qy                       | Number         | 나트륨         |
| chole_Qy                    | Number         | 콜레스테롤     |
| tag                         | String         | 태그 정보      |

<br>
</details>

<br>

## 프로젝트 관리 및 회고
- 알고리즘은 python를 통해 동작하는 추천 정보를 가져오는 과정에서 글자를 사용하면 올바르게 인코딩 되지 않는 문제가 발생하여, 각 식품의 id를 활용해여 숫자를 통해서 각 식품 정보를 가져올 수 있도록 구성하였습니다.
- 추천할 id를 기준으로 식품의 데이터를 가져오는 과정에서 랜더링 결과에 데이터가 담겨 있지 않은 문제가 발생하여, 받은 id의 개수를 기준으로 총 담긴 데이터의 개수가 해당 개수를 만족하는 경우에 랜더링을 진행할 수 있도록 하여 비동기화 방식에서 원하는 형식으로 결과를 반환할 수 있었습니다.
