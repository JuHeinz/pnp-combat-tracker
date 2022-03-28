import React from "react";
import ReactDOM from "react-dom";

import creatureData from "./creature-data";
import LibraryTable from "./Components/Library/LibraryTable";
import Tracker from "./Components/CombatTracker/Tracker";

function App() {
  const [creatureList, setCreatureList] = React.useState(creatureData);

  // ADD TO COMBAT
  /*  When "add" is clicked on a creature in the Library this function runs.
   The creature is then added to a new state called "combatantList" 
   From then out it is decoupled from the creatureList */
  const [combatantList, setCombatantList] = React.useState([]);

  function addToCombat(index) {
    setCombatantList((prevCombatantList) => {
      let newCombatant = {
        ...creatureList[index - 1],
        id: prevCombatantList.length + 1,
        initiative: roll2D6() + creatureList[index - 1].Dexterity,
      };
      let newCombatantList = [...prevCombatantList, newCombatant];
      // sort by Initiative, direction in cards is reversed via flexbox
      newCombatantList.sort(function (a, b) {
        return a.initiative - b.initiative;
      });
      return newCombatantList;
    });
    console.log(combatantList);
  }

  function roll2D6() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    return num1 + num2;
  }
  return (
    <>
      <LibraryTable creatureList={creatureList} handleClick={addToCombat} />
      <Tracker combatantList={combatantList} />
    </>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
