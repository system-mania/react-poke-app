import { useEffect, useState } from 'react';
import Type from './Type';

const DamageRelations = ({ damages }) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState([]);

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, [damages]);

  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, 'to'),
      from: joinObjects(props, 'from'),
    };
  };

  const reduceDuplicateValues = (props) => {
    const DuplicateValues = {
      double_damage: '4x',
      half_damage: '1/4x',
      no_damage: '0x',
    };
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const verifiedValue = FilterForUniqueValues(value, DuplicateValues[key]);
      return {
        [keyName]: verifiedValue,
        ...acc,
      };
    }, {});
  };

  const FilterForUniqueValues = (valueForFiltering, damageValue) => {
    if (!Array.isArray(valueForFiltering)) {
      // Handle the case when valueForFiltering is not an array
      return [];
    }

    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      const filterACC = acc.filter((a) => a.name !== name);

      return filterACC.length === acc.length
        ? [currentValue, ...acc]
        : [{ damageValue: damageValue, url: url, name: name }, ...filterACC];
    }, []);
  };

  const joinObjects = (props, string) => {
    const key = string;
    const FirstArrayValue = props[0][key];
    const SecondArrayValue = props[1][key];

    return Object.entries(SecondArrayValue).reduce((acc, [KeyName, value]) => {
      const key = KeyName;
      const result = FirstArrayValue[key]?.concat(value);

      return (acc = { [KeyName]: result, ...acc });
    }, {});
  };

  const postDamageValue = (props) => {
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const ValueOfKeyName = {
        double_damage: '2x',
        half_damage: '1/2x',
        no_damage: '0x',
      };

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: ValueOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
  };

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRalations('_from', damage);

    const to = filterDamageRalations('_to', damage);

    return { from, to };
  };

  const filterDamageRalations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const KeyWithValueFilterRemove = keyName.replace(valueFilter, '');
        return (acc = { [KeyWithValueFilterRemove]: value, ...acc });
      }, {});

    return result;
  };

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName;
            const valuesOfKeyName = {
              double_damage: 'Weak',
              half_damage: 'Resistant',
              no_damage: 'Immune',
            };
            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                  {valuesOfKeyName[key]}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => (
                      <Type key={url} type={name} damageValue={damageValue} />
                    ))
                  ) : (
                    <Type type={'none'} key={'none'} />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DamageRelations;
