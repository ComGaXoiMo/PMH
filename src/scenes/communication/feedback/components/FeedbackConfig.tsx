// import React from 'react'
// import { Tabs } from 'antd'
// import { L } from '@lib/abpUtility'
// import WfStatus from '@scenes/workflow/status'
// import WfTracker from '@scenes/workflow/tracker'
// import WfConfiguration from '@scenes/workflow/configuration'
// import WfStatusStore from '@stores/workflow/wfStatusStore'
// import WfRoleStore from '@stores/workflow/wfRoleStore'
// import WfTrackerStore from '@stores/workflow/wfTrackerStore'
// import WfConfigurationStore from '@stores/workflow/wfConfigurationStore'
// import { moduleIds } from '@lib/appconst'

// const { TabPane } = Tabs
// interface Props {}

// const FeedbackConfig = (props: Props) => {
//   return (
//     <div className="card-container sla-container">
//       <Tabs type="card">
//         <TabPane tab={L('STATUS')} key="1">
//           <WfStatus history={null} wfStatusStore={new WfStatusStore()} moduleId={moduleIds.feedback} />
//         </TabPane>
//         <TabPane tab={L('FEEDBACK_TYPE')} key="2">
//           <WfTracker history={null} wfTrackerStore={new WfTrackerStore()} moduleId={moduleIds.feedbackType} />
//         </TabPane>
//         <TabPane tab={L('FEEDBACK_CATEGORY')} key="3">
//           <WfTracker
//             history={null}
//             wfTrackerStore={new WfTrackerStore()}
//             moduleId={moduleIds.feedback}
//             parentModuleId={moduleIds.feedbackType}
//           />
//         </TabPane>
//         <TabPane tab={L('CONFIGURATION')} key="4">
//           <WfConfiguration
//             history={null}
//             wfConfigurationStore={new WfConfigurationStore()}
//             wfRoleStore={new WfRoleStore()}
//             moduleId={moduleIds.feedback}
//           />
//         </TabPane>
//       </Tabs>
//     </div>
//   )
// }

// export default FeedbackConfig

import React from 'react'
import { Tabs } from 'antd'
import { L } from '@lib/abpUtility'
import WfStatus from '@scenes/workflow/status'
import WfPriority from '@scenes/workflow/priority'
import WfRole from '@scenes/workflow/role'
import WfTracker from '@scenes/workflow/tracker'
import WfCustomField from '@scenes/workflow/customField'
import WfConfiguration from '@scenes/workflow/configuration'
import WfStatusStore from '@stores/workflow/wfStatusStore'
import WfPriorityStore from '@stores/workflow/wfPriorityStore'
import WfRoleStore from '@stores/workflow/wfRoleStore'
import WfTrackerStore from '@stores/workflow/wfTrackerStore'
import SettingWorkflowSLA from '@scenes/workflow/sla'
import WfCustomFieldStore from '@stores/workflow/wfCustomFieldStore'
import WfConfigurationStore from '@stores/workflow/wfConfigurationStore'
import { moduleIds } from '@lib/appconst'

const { TabPane } = Tabs
interface Props {}

const FeedbackConfig = (props: Props) => {
  return (
    <div className="card-container sla-container">
      <Tabs type="card">
        <TabPane tab={L('STATUS')} key="1">
          <WfStatus history={null} wfStatusStore={new WfStatusStore()} moduleId={moduleIds.feedback} />
        </TabPane>
        <TabPane tab={L('PRIORITY')} key="2">
          <WfPriority history={null} wfPriorityStore={new WfPriorityStore()} moduleId={moduleIds.feedback} />
        </TabPane>
        <TabPane tab={L('ROLE')} key="3">
          <WfRole history={null} wfRoleStore={new WfRoleStore()} moduleId={moduleIds.feedback} />
        </TabPane>
        <TabPane tab={L('TRACKER')} key="4">
          <WfTracker history={null} wfTrackerStore={new WfTrackerStore()} moduleId={moduleIds.feedback} />
        </TabPane>
        <TabPane tab={L('CUSTOM_FIELD')} key="5">
          <WfCustomField history={null} wfCustomFieldStore={new WfCustomFieldStore()} moduleId={moduleIds.feedback} />
        </TabPane>
        <TabPane tab={L('CONFIGURATION')} key="6">
          <WfConfiguration
            history={null}
            wfConfigurationStore={new WfConfigurationStore()}
            wfRoleStore={new WfRoleStore()}
            moduleId={moduleIds.feedback}
          />
        </TabPane>
        <TabPane tab={L('SLA')} key="7">
          <SettingWorkflowSLA moduleId={moduleIds.feedback} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FeedbackConfig
