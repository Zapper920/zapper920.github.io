# README.md


There are two stylesheets - `good.css`, and  `bad.css`. 

Your job is to make _two_ different menus using the same valid HTML5
`<nav>` element structure: 
- one that looks good and behaves well, and 
- one that should be as ugly and unusable as you would like it to be.

You must use at least _one_ CSS transition in each CSS file. 

Please detail your process, any people you may have worked with, specific
tutorials that may have found useful, tales of your interactions with
AI, or anything else you might want to document in the space below. 

Not including this part will instantly cost you 10 points:

---

## Process

> **Notice of Generative AI Usage**
> Generative AI was not used in any form in the formulation or creation of this assignment.

For both pages, I first created a rough plan of what I wanted to create: a simple, minimalistic layout for the "Good" page, and a frustrating, maximalistic layout for the "Bad" page. I based the styling of the "Good" example off of the style that I typically use for my personal work. I used primarily black on stark white, with a minimal use of opacity and shades of grey for element and state distinction. At first, I was going to go with an `::after` pseudo-element animated underline, but instead chose to use the built-in `text-decoration`, as I rarely have used this property and wanted to see what I could make with it. I'm fairly happy with the animated wave underline I was able to create, however I was unable to figure out how to make the underline perfectly expand from the word center, which I have been able to do easily with pseudo-elements in the past. 

For the "Bad" example, I tried to create as inaccessible and counterintuitive of an interface as possible. I used poor color combinations (gold on gold), a barcode font for the label, and visually unappealing star bullet-points for the navigation items. I had initially intended to make each navigation link constantly move away from the cursor, but without the use of JavaScript, moving it away upon initial hover was the closest I could get. I used a flexbox column for the desktop layout, and flexbox row for the mobile layout on this page.

I worked alone on this project, and the only external sources I used was the MDN documentation site, as well as Google Fonts for the "Bad" page's typefaces. I would note that, as opposed to the provided sample, I used a 'max-width' media query for the mobile layout, as I typically prefer to work with the desktop layout in the main document and optimize for mobile afterwards.