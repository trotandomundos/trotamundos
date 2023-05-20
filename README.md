![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Trotamundos


## Introduction

Our project offers tourists the opportunity to obtain information collected from 4 social media platforms. This information is carefully curated and integrated to create a unique catalog.

## Built with
- HTML / CSS / JavaScript / Handlebars
- npm / MongoDB / NodeJS / ExpressJS
- Tourpedia / Mapbox  / Cloudinary / Bcrypt

## User Stories
- **404** - As users, we want to see a nice 404 error page when I go to a page that doesn’t exist so that we know it was our fault. 🙊
- **500** - As users, we want to see a nice 500 error page when the team behind the app brokes something and it's not our fault. 🦦
- **Homepage** - As users, we want to be able to access the homepage and select by category service and search by specific service. 🦁
- **Experiences page** - As users, we want to be able to see all the experiences available inside a category. 🐯
- **Find places page** - As users, we want to see the details of a selected site, and get position of it. 🐆
- **Create review** - As users, we must be able to review a the experiences that other users suggest 🐱
- **Review page** - As users, we want to be able to make a review to the user who provides the service booked. 🦄
- **Sign up** - As users, we want to be able to create an account and sell amazing services. 🐣
- **Log in** - As users, we want to be able to log in and manage our profile and services. 🐥
- **Profile page** - As users, we want to be able to edit our profile, manage our services and visualize our history of sold and booked services. 🦢
- **Edit user/experience page** - As users, we want to be able to edit . 🐽

## Models

### Experience.model.js
```javascript
{
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  titulo: {
    type: String,
  },
  texto: {
    type: String,
  },
  imagen: {
    type: String,
  },
  filtro: {
    type: [String],
    enum: ["pais", "ciudad", "naturaleza", "ocio", "precio"],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    }

```


### Review.model.js
```javascript
 userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experienceId: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 500,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
```
### Slides

URls for the project presentation
[Link Slides.com](https://slides.com/fritzweninger/code)

