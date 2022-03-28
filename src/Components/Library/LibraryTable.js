import React from "react";
import LibraryRow from "./LibraryRow";

export default function LibraryTable(props) {
  const allRows = props.creatureList.map((creature) => {
    return (
      <LibraryRow
        key={creature.id}
        id={creature.id}
        cName={creature.cName}
        Strength={creature.Strength}
        Dexterity={creature.Dexterity}
        AttackModifier={creature.AttackModifier}
        DefenceModifier={creature.DefenceModifier}
        MaxHP={creature.MaxHP}
        DamageDice={creature.DamageDice}
        Status={creature.Status}
        isInCombat={creature.isInCombat}
        handleClick={props.handleClick}
      />
    );
  });

  return (
    <div className="offcanvas offcanvas-top" tabIndex="-1" id="library">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="libraryLabel">
          Library
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <table className="table table-hover table-striped table-sm table-responsive">
          <thead className="">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">
                <abbr title="Strength Modifier">STR</abbr>
              </th>
              <th scope="col">DEX </th>
              <th scope="col">Attack</th>
              <th scope="col">Defence</th>
              <th scope="col">Max HP</th>
              <th scope="col">Damage</th>
            </tr>
          </thead>
          <tbody>{allRows}</tbody>
        </table>
      </div>
    </div>
  );
}
