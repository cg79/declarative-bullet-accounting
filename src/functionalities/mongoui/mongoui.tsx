import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { useBetween } from '../../hooks/useBetween';
import useMongoUi from './useMongoUi';
import GenericList from '../todo/list/GenericList';
import { MyButton } from '../../_components/reuse/my-button';

const MongoUi = () => {
  //   const { mongoUi } = useBetween(useMongoUi);
  const { executeMethod, executeMethodFromModule } = useApi();
  const [collections, setCollections] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    executeMethodFromModule({
      moduleName: 'bullet',
      method: 'getCollections',
      body: {},
    }).then((response) => {
      console.log(response);
      setCollections(response.data);
    });
  }, []);

  const renderCollections = () => {
    return collections.map((el) => {
      return (
        <div onClick={() => setSelected(el)}>
          {el}
          <MyButton
            text="delete"
            onClick={(event) => {
              event.stopPropagation();
              executeMethodFromModule({
                moduleName: 'bullet',
                method: 'dropCollection',
                body: {
                  collectionName: el,
                },
              }).then((response) => {
                console.log(response);
              });
            }}
          ></MyButton>
        </div>
      );
    });
  };
  return (
    <div>
      MongoUi
      {renderCollections()}
      {selected && (
        <div>
          <GenericList
            collectionName={selected}
            createItem={() => ({})}
            modalTitle={(item) => 'Edit ' + item.name}
            addItemButtonLabel="Add"
            renderAddEditContent={(item) => {
              return (
                <div>
                  <h1>hello</h1>
                </div>
              );
            }}
            sortBy={[{ field: 'name', ascending: true }]}
            filterBy={{}}
            fieldHeader={[]}
            renderCreateFirstItem={() => null}
          ></GenericList>
        </div>
      )}
    </div>
  );
};
export default MongoUi;
