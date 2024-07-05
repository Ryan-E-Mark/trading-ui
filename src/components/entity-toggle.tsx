import React, { FC } from "react";
import { EntityType } from "../types/entity-type";
import { Tab } from "./tab";

type EntityToggleProps = {
  entity: EntityType;
  toggleEntityValue: (entity: EntityType) => void;
};

export const EntityToggle: FC<EntityToggleProps> = ({
  entity,
  toggleEntityValue,
}) => {

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full justify-center text-xl h-16">
        <Tab
          title="BTC"
          isActive={entity === 'BTC'}
          onClick={() => toggleEntityValue('BTC')}
        />
        <Tab
          title="ETH"
          isActive={entity === 'ETH'}
          onClick={() => toggleEntityValue('ETH')}
        />
      </div>
    </div>
  );
};
