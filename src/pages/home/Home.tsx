import './Home.css';
import {endOfMonth, startOfMonth} from 'date-fns';
import {useEffect, useState} from 'react';
import {Box, CssBaseline, Modal} from '@mui/material';
import {Close} from '@mui/icons-material';
import {Preview} from '../preview/Preview.tsx';
import {ProjectContext} from './context/project.context.ts';
import {ProjectOrder} from './interfaces/ProjectOrder.ts';
import {getProjects} from '../../services/project.service.ts';
import {buildCombination} from '../../utils/address-util.ts';

function Home() {
  const [projectOrders, setProjectOrders] = useState<ProjectOrder[]>([]);
  const [selectedProjectOrderIndex, setSelectedProjectOrderIndex] = useState<number>();
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(startDate);
  const beginRow = 1;
  const endRow = 100;

  const handleUpdateProject = (project: ProjectOrder) => {
    setProjectOrders(projects => projects.map((projectOrder) => {
      if (projectOrder.project.id_product_order === project.project.id_product_order) {
        return project;
      }
      return projectOrder;
    }));
  };

  useEffect(() => {
    getProjects(startDate, endDate, beginRow, endRow)
      .then((response) => response.response
        ?.map((project) => {
          return {
            project,
            order: JSON.parse(project.description2),
            validateCredit: JSON.parse(project.validate_credit)
          } as ProjectOrder;
        }))
      .then(projectOrders => setProjectOrders(projectOrders || []));
  }, []);

  return (
    <>
      <ProjectContext.Provider value={{
        selectedProjectIndex: selectedProjectOrderIndex,
        projectOrders: projectOrders,
        updateProject: handleUpdateProject
      }}>

        <CssBaseline/>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
        }}>
          {/*buscador*/}
          <div>
            <input/>
            <div>filters</div>
          </div>
          {/*lista*/}
          <div>

            {
              projectOrders.map((projectOrder, index) =>
                <ProjectOrderItem
                  key={projectOrder.project.id_product_order}
                  projectOrder={projectOrder}
                  onClick={() => setSelectedProjectOrderIndex(index)}
                  isActive={selectedProjectOrderIndex === index}
                />)
            }

          </div>
        </div>

      </ProjectContext.Provider>
    </>
  );
}

type ProjectOrderComponentProps = {
  projectOrder: ProjectOrder,
  //Sirve para marcar el projecto sobre el cual se ha hecho clic
  isActive?: boolean,
  onClick?: () => void
}

function ProjectOrderItem(props: ProjectOrderComponentProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {projectOrder: {project, order}} = props;
  const idProject = project.id_product_order;
  const formatedAddress = order.customer.installAddress.formatedAddress;

  const onClickEventHandler = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="project-order"
      onClick={props.onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '65px',
        width: '100%',
        borderLeft: props.isActive ? '5px solid' : '',
        borderColor: props.isActive ? '#fd3c3c' : '',
      }}>

      {/*Project*/}
      <div style={{display: 'flex'}}>
        <div style={{margin: '0 10px 0 0'}} onClick={onClickEventHandler}>
          {idProject}
        </div>
        <div onClick={onClickEventHandler}>
          {buildCombination(formatedAddress)}
        </div>
      </div>

      {/*flags*/}
      <div style={{display: 'flex'}}>
        <div>tag</div>
      </div>

      {/*Modal*/}
      <ProjectModalDetail
        open={openModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function ProjectModalDetail(props: {
  onClose: () => void,
  open: boolean
}) {
  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '85%',
    width: '75%',
    padding: '10px',
  };

  return <Modal
    open={props.open}
    // onClose={props.onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    disableAutoFocus={true}
  >
    <Box sx={boxStyle}>
      <Close
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          margin: '10px',
          color: '#000'
        }}
        onClick={props.onClose}/>
      <Preview/>
    </Box>
  </Modal>;
}


export default Home;
