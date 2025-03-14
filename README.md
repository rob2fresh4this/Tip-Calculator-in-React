# Tip Calculator

## Description:
Create a Tip Calculator based on the FrontEndMentor starter template.

## Requirements:
- **React** for building the application
- **Tailwind CSS** for styling
- Must support both **Desktop and Mobile** versions

#### Your Names:  Robert G.

#### Date Revised  
- [3/13/25]  

#### Exercise or Lab Name  
[Tip Calculator in React]

## Peer Review: Santiago Jesus Montanez

- IMmediately, Number of people area is standing out as the red text "Can't be zero" stands out. Border should also be red if the input field is 0
  - Suggestion: Take advantage of turnerary expressions and useState() to control classes
- input fields (All): Try removing the scrollbar type number input fields
  - research about CSS webkits. They are responsible for default html appearances
- I cannot interact with the "RESET" button.
- Fonts don't seem to match the styleguide markdown file. Please refer to the file to more closely match the UI designer's intent and design
- Text for all the input fields should be the "Very Dark" cyan color, not black
- If the party size is zero while the bill and tip amount aren't then the tip amount for a person shouldn't equal "$Infinity"
