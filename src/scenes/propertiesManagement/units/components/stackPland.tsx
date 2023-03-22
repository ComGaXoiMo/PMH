import * as React from "react";
import { Card } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { sum, reduce } from "lodash";
import { L } from "@lib/abpUtility";
import ProjectStore from "@stores/projects/projectStore";
import { formatNumber, renderDate } from "@lib/helper";
import projectService from "@services/projects/projectService";
import Alert from "antd/lib/alert";
import "./stacking-plan.less";
import AppDataStore from "@stores/appDataStore";
import UnitStore from "@stores/projects/unitStore";
import { inject } from "mobx-react";
import Stores from "@stores/storeIdentifier";
import AppComponentBase from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const UnitEmpty = ({ width, size }: { width: number; size: number }) => {
  if (size <= 0) return null;

  return (
    <div
      style={{ flexBasis: `${width}%` }}
      className="unit-item unit-empty mb-0"
    >
      <p className="mb-0">{L("EMPTY")}</p>
      <small>{formatNumber(size)}</small>
    </div>
  );
};

export interface IProjectStackingPlanProps {
  projectId: number;
  projectStore: ProjectStore;
  unitStore: UnitStore;
  appDataStore: AppDataStore;
  loading: any;
}
@inject(
  Stores.AppDataStore,
  Stores.ProjectStore,
  Stores.ActivityStore,
  Stores.FileStore,
  Stores.UnitStore
)
class StackPland extends AppComponentBase<IProjectStackingPlanProps> {
  formRef: any = React.createRef();
  state = {
    floors: [],
    unitGroups: {},
    selectedUnit: null,
    modalVisible: false,
    statisticFilter: { projectId: this.props.projectId },
  };

  componentDidMount = () => {
    this.fetchData();
  };

  hideOrShowModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  showCreateOrUpdateModalOpen = async (id?) => {
    if (!id) {
      await this.props.projectStore.createProjectUnit();
    } else {
      await this.props.projectStore.getProjectUnit(id);
    }

    this.setState({ unitId: id, modalVisible: true }, () => {
      setTimeout(() => {
        this.formRef.current.setFieldsValue({
          ...this.props.projectStore.editProjectUnit,
        });
      }, 500);
    });
  };

  handleCreateOrUpdate = async () => {
    try {
      const form = this.formRef.current;
      if (!form) {
        return;
      }
      // Update case
      form.validateFields().then(async (values: any) => {
        if (this.props.projectStore.editProjectUnit?.id) {
          await this.props.projectStore.updateUnit({
            ...this.props.projectStore.editProjectUnit,
            ...values,
          });
        } else {
          await this.props.projectStore.createUnit({
            ...values,
            projectId: this.props.projectId,
          });
        }

        await this.fetchData();
        this.hideOrShowModal();
        this.setState({ editingRowKey: "" });
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  onDragEnd = async ({ source: src, destination: des }: DropResult) => {
    if (!des || src.droppableId !== des.droppableId) return;

    if (src.droppableId === "floor") {
      this.setState(
        (prev: any) => ({ floors: reorder(prev.floors, src.index, des.index) }),
        async () =>
          await projectService.updateFloorOrder(
            this.state.floors.map((p: any) => p.id)
          )
      );
    } else {
      this.setState(
        (prev: any) => ({
          unitGroups: {
            ...prev.unitGroups,
            [src.droppableId]: [
              ...reorder(
                prev.unitGroups[src.droppableId],
                src.index,
                des.index
              ),
            ],
          },
        }),
        () =>
          projectService.updateUnitOrder(
            this.state.unitGroups[src.droppableId].map((p) => p.id)
          )
      );
    }
  };

  sort = (a, b) => a.order - b.order;

  fetchData = async () => {
    const { projectId } = this.props;
    await this.props.projectStore.getFloors(projectId, {});
    await this.props.projectStore.getUnits(projectId, {});
    const floors = this.props.projectStore.floors.sort(this.sort);
    const unitGroups = reduce(
      this.props.projectStore.units,
      (result, unit) => {
        const key = `f-${unit.floorId}`;
        if (!result[key]) result[key] = [];
        result[key].push(unit);
        result[key].sort(this.sort);
        return result;
      },
      {}
    );
    this.setState({ floors, unitGroups });
  };

  renderUnitInFloor = (floor, placeholder) => {
    const key = `f-${floor.id}`;
    const units: Array<any> = this.state.unitGroups[key] || [];
    if (units.length < 1) {
      return <UnitEmpty width={100} size={floor.size} />;
    }
    const sumUnits = sum(units.map((unit) => unit.size));
    const percentUnits = 100 - (sumUnits / floor.size) * 100;

    return (
      <>
        {units.map((unit, inx) => (
          <Draggable
            key={`unit-drag-${unit.id}`}
            draggableId={`u-${unit.id}`}
            index={inx}
          >
            {(dragProvided) => (
              <div
                ref={dragProvided.innerRef}
                {...dragProvided.draggableProps}
                {...dragProvided.dragHandleProps}
                className={`unit-item ${unit.color || "unit-empty"}`}
                style={{
                  ...dragProvided.draggableProps.style,
                  flex: `0 1 ${(unit.size / floor.size) * 100}%`,
                }}
                onClick={() => this.showCreateOrUpdateModalOpen(unit.id)}
              >
                <p className="mb-0 text-truncate">
                  {unit.unitName} - <small>{unit.statusName}</small>
                </p>
                <small>
                  {formatNumber(unit.size)} m<sup>2</sup>
                </small>
                <p className="mb-0 text-truncate">
                  <small>{unit.orgTenantBusinessName}</small>
                </p>
                {unit.expiredDate && (
                  <div className="text-truncate">
                    {L("AVAILABLE")}: {renderDate(unit.expiredDate)}
                  </div>
                )}
              </div>
            )}
          </Draggable>
        ))}
        {/*<UnitDiv className="unit-item p-0">{placeholder}</UnitDiv>*/}
        {sumUnits !== 0 && (
          <UnitEmpty width={percentUnits} size={floor.size - sumUnits} />
        )}
      </>
    );
  };

  renderFloors = () =>
    this.state.floors.map((floor: any, inx) => (
      <Draggable
        key={`f-drag-${floor.id}`}
        draggableId={`f-${floor.id}`}
        index={inx}
      >
        {(dragProvided) => (
          <div
            className="floor-item mb-2 mr-1"
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
          >
            <p className="mb-0">{floor.floorName}</p>
            <small>{formatNumber(floor.size)}</small>
          </div>
        )}
      </Draggable>
    ));

  render() {
    const { floors } = this.state;
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Card className="stacking-plan">
            <Alert message={L("CLICK_TO_EDIT_UNIT_MESSAGE")} type="info" />
            <div className="d-flex mt-3">
              <Droppable droppableId="floor" direction="vertical">
                {(providedFloor) => (
                  <div
                    style={{ flex: "0 0 100px" }}
                    ref={providedFloor.innerRef}
                    {...providedFloor.droppableProps}
                  >
                    {this.renderFloors()}
                    {providedFloor.placeholder}
                  </div>
                )}
              </Droppable>
              <div style={{ flex: "0 1 100%" }} className="overflow-x">
                {floors.map((floor: any) => (
                  <Droppable
                    key={`f-drop-${floor.id}`}
                    droppableId={`f-${floor.id}`}
                    direction="horizontal"
                  >
                    {(providedUnit) => (
                      <div
                        className="d-flex wrap-units overflow-x mb-2"
                        ref={providedUnit.innerRef}
                        {...providedUnit.droppableProps}
                      >
                        {this.renderUnitInFloor(
                          floor,
                          providedUnit.placeholder
                        )}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </div>
          </Card>
        </DragDropContext>
      </>
    );
  }
}

export default withRouter(StackPland);
