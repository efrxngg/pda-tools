import {ReactNode, useContext, useEffect, useState} from 'react';
import {CssBaseline, Tooltip} from '@mui/material';
import {ProjectContext} from '../home/context/project.context.ts';
import {clone} from '../../utils/in-mutability.utils.ts';
import {ProjectOrder} from '../home/interfaces/ProjectOrder.ts';
import {ProjectOrderService} from './services/project-order.service.tsx';
import {ITag} from './interfaces/i-tag.ts';
import {Subscriber} from '../../interfaces/product-order/order.ts';
import {buildCombination} from '../../utils/address-util.ts';
import {copyToClipboard} from '../../utils/io.util.ts';

export function Preview() {
  const projectContext = useContext(ProjectContext);
  console.log(projectContext);

  if (!projectContext || projectContext.selectedProjectIndex === undefined) {
    return defaultErrorMsg;
  }

  const {selectedProjectIndex, projectOrders} = projectContext;
  const project = clone(projectOrders[selectedProjectIndex]);

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   if (!projectContext)
  //     return;
  //   project.order.customer.installAddress.formatedAddress.parish = e.currentTarget.value;
  //   updateProject(project);
  // }

  return <>
    <CssBaseline/>
    {/*box*/}
    <div style={{
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      borderRadius: '.5rem',
      padding: '2.5% 4%',
      gap: '1.5rem',
    }}>

      {/*<input onChange={handleChange}/>*/}

      {/*header box*/}
      <HeaderComponent project={project}/>
      {/*body box*/}
      <BodyComponent project={project}/>
    </div>

  </>;
}

function HeaderComponent({project}: CommonPropsProjectDetail) {

  return <div style={{
    width: '100%',
    flexBasis: '20%',
    // padding: '1% 1.5%',
  }}>
    <div>
      {/*id project*/}
      <div style={{
        // fontSize: '38.4px',
        fontSize: '2.4rem',
        fontWeight: 'bold'
      }}>{project.project.id_product_order}
      </div>
      {/*tags*/}
      <div>
        <Tags project={project}/>
      </div>
    </div>
  </div>;
}

function BodyComponent({project}: CommonPropsProjectDetail) {

  const {
    installAddress: {formatedAddress},
    fmcSale, changeFmcOffer, supplementarySale,
    subscriber
  } = project.order.customer;
  const fullAddress = buildCombination(formatedAddress);
  let typeSale = (fmcSale || changeFmcOffer) ? 'FMC' : 'IND';

  if (supplementarySale) {
    typeSale = 'ANY';
  }

  return (
    <div style={{
      flexBasis: '80%',
      width: '100%',
      // padding: '1.5% 1.5%',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        gap: '.5rem',
      }}>
        {/*Info Box*/}
        <div style={{width: '50%', height: '100%'}}>
          {/*PACKAGE INFO*/}
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              Paquete, Servicios o Recurso
            </span>
            <span style={{
              fontSize: '.7rem',
              fontWeight: 'bold'
            }}>
            {/*TODO - VER SI SE PUEDE AGREGAR LA OFERTA PADRE */}
              {typeSale}
            </span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.25rem',
            }}>
              {subscriber
                .filter(sub => sub.primaryOffer.isPrimary === 'Y')
                .map(({primaryOffer, optionalOffer, resourceOffer}: Subscriber) => {
                  const {offeringName} = primaryOffer;
                  const lenVisibility = 40;
                  const text = offeringName.length > lenVisibility ? `${offeringName.substring(0, lenVisibility)}...` : offeringName;
                  return (
                    <div key={primaryOffer.id}
                         style={{
                           display: 'flex',
                           fontSize: '.9rem',
                           backgroundColor: '#f5f5f5',
                           padding: '.9rem',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                         }}>
                      <div>
                        <Tooltip title={offeringName}>
                          <span>{text}</span>
                        </Tooltip>
                      </div>
                      {/*buttons*/}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '.25rem',
                      }}>
                        {/*Services Tag*/}
                        {
                          optionalOffer.length > 0 &&
                            <div style={{
                              display: 'flex',
                              gap: '.5rem',
                              backgroundColor: '#EFEDE0',
                              padding: '.1rem .25rem',
                              borderRadius: '.35rem',
                            }}>
                                <span>Servicios</span>
                            </div>
                        }
                        {/*Resources Tag*/}
                        {
                          resourceOffer.length > 0 &&
                            <div style={{
                              display: 'flex',
                              gap: '.5rem',
                              backgroundColor: '#EFEDE0',
                              padding: '.25rem',
                              borderRadius: '.35rem',
                            }}>
                                <span>Recursos</span>
                            </div>
                        }


                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/*ADDRESS INFO*/}
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              Informacion de instalacion
            </span>
            <span style={{
              fontSize: '.7rem',
              fontWeight: 'bold'
            }}>
            {/*TODO - AGREGAR EL FULL ADDRESS DEL QUERY COVERAGE */}
              {fullAddress.toUpperCase()}
            </span>
            <div style={{
              display: 'flex',
              gap: '.25rem',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {Object.entries(formatedAddress)
                .map(([key, value]) => {
                  const values = value.split('|');
                  return [key, values.length > 1 ? values[1] : value];
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, value]) =>
                  value !== undefined &&
                  value !== '' &&
                  value !== 'undefined')
                .map(([key, value]) => (
                  <span key={key}
                        style={{
                          fontSize: '.6rem',
                          backgroundColor: '#f5f5f5',
                          padding: '0 .5rem',
                          borderRadius: '.35rem',
                        }}
                        onClick={() => copyToClipboard(value)}
                  >
                    {key}: {value}
                  </span>))
              }
            </div>
          </div>
        </div>

        {/*Details MultiCheck Box*/}
        <div style={{width: '50%', height: '100%'}}>
          <div style={{
            width: '100%',
            height: '100%',
            border: '1px solid black',
            borderRadius: '.9rem',
          }}>
            Box
          </div>
        </div>
      </div>
    </div>);
}

function Tags({project}: CommonPropsProjectDetail) {
  const [tags, setTags] = useState<ITag[][]>([]);

  useEffect(() => {
    const projectOrderService = new ProjectOrderService();
    const tagsOfProject = projectOrderService.getTags(project);
    tagsOfProject.forEach(tag => {
      tag.metadata = tag.metadata
        .filter(a =>
          a !== undefined &&
          a !== '' &&
          a !== 'undefined');
    });

    const chunks = [];
    const chunkSize = 2;

    for (let i = 0; i < tagsOfProject.length; i += chunkSize) {
      chunks.push(tagsOfProject.slice(i, i + chunkSize));
    }

    setTags(chunks);
  }, [project]);

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    fontSize: '.7rem',
    width: '100%',
    justifyContent: 'space-between',
    gap: '.5rem',
  }}>
    {/*column*/}
    {tags.map((tagRow: ITag[], index) => <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
      {/*rows*/}
      {tagRow.map(tag => <Tag key={tag.name} {...tag}/>)}
    </div>)}
  </div>
    ;
}

type TagProps = {
  icon: ReactNode,
  name: string,
  metadata: string[]
}

function Tag(props: TagProps) {
  const {name, icon, metadata} = props;
  const metadataItems = metadata.map(item => <span
    key={item}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.2rem',
      background: '#c7c7c7',
      padding: '0 .35rem',
    }}>{item}
  </span>);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '1.5em',
      justifyContent: 'space-between',
      justifyItems: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'center',
        gap: '.25rem',
      }}>
        {icon}
        {name}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '.25rem',
      }}>
        {metadataItems}
      </div>
    </div>
  );
}


const defaultErrorMsg = (<>
    <h1>Don't selected project order</h1>;
    <h1>What is this :(</h1>
  </>
);

type CommonPropsProjectDetail = {
  project: ProjectOrder
};