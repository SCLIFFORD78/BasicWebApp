import {writable} from "svelte/store";

export let mainBar = [
  {
    title: "Home",
    icon: "fas fa-home fa-3x",
    colour: "color:rgb(153, 196, 74)",
    link: "/",
  },
  {
    title: "Add Calf",
    icon: "fas fa-plus-circle fa-3x",
    colour: "color:rgb(149, 93, 176)",
    link: "/#/add",
  },
  {
    title: "Feed Plans",
    icon: "fas fa-drumstick-bite fa-3x",
    colour: "rgb(102, 153, 255)",
    link: "/#/feedplans",
  },

];

export let feedPlanBar = [
  {
    title: "Home",
    icon: "fas fa-home fa-3x",
    colour: "color:rgb(153, 196, 74)",
    link: "/",
  },
  {
    title: "Add Feed Plan",
    icon: "fas fa-plus-circle fa-3x",
    colour: "color:rgb(149, 93, 176)",
    link: "/#/addfeedplans",
  },
  {
    title: "Feed Plans",
    icon: "fas fa-drumstick-bite fa-3x",
    colour: "rgb(102, 153, 255)",
    link: "/#/feedplans",
  },

];

export const navBar = writable({
  bar: [],
});

export const selectedCalf = writable({
  _id: ""
});

export const selectedFeedplan = writable(
  ""
);