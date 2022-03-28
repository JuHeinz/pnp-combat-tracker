import React from "react";
import TrackerCard from "./TrackerCard";

export default function Tracker(props) {
  function roll2D6() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    return num1 + num2;
  }

  const trackerCards = props.combatantList.map((combatant) => {
    return (
      <TrackerCard
        key={combatant.id}
        id={combatant.id}
        cName={combatant.cName}
        damageDice={combatant.DamageDice}
        currentHP={combatant.currentHP}
        AttackModifier={combatant.AttackModifier}
        DefenceModifier={combatant.DefenceModifier}
        Strength={combatant.Strength}
        Dexterity={combatant.Dexterity}
        MaxHP={combatant.MaxHP}
        initiative={combatant.initiative}
      />
    );
  });

  return (
    <section className="tracker-section">
      <h2>Combat Tracker</h2>
      <hr />
      <div className="tracker-card-holder">{trackerCards}</div>
    </section>
  );
}
