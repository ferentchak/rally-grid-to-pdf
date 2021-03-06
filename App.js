Ext.define('Rally.newProject.StoryGrid', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function () {
        // Add iteration combobox and print button to the page
        this.add({
            xtype: 'container',
            flex: 1,
            width: '800px',
            layout: {
                type: 'hbox',
                defaultMargins: '25 50 25 50'
            },
            items: [
                {
                    xtype: 'rallyiterationcombobox',
                    id: 'iterationComboBox',
                    listeners: {
                        ready: this._onIterationsLoaded,
                        select: this._onIterationChanged,
                        scope: this
                    },
                    fieldLabel: 'Select an Iteration ',
                    width: '350px'
                },
                {
                    xtype: 'button',
                    text: 'Print to PDF',
                    id: 'printPdfBtn',
                    handler: () => {
                        let sharedStyles = 'border: 1px solid #222; padding: 5px; font-family: NotoSans,Helvetica,Arial;';
                        printJS({
                            printable: this._getDataAsJson(),
                            properties: [
                                { field: 'name', displayName: 'Name', columnSize: '60%' },
                                { field: 'scheduleState', displayName: 'Schedule State', columnSize: '20%' },
                                { field: 'awesomeTown', displayName: 'Awesome Town', columnSize: '20%' }
                            ],
                            gridHeaderStyle: sharedStyles + ' font-size: 14px;',
                            gridStyle: sharedStyles + ' font-size: 12px;',
                            documentTitle: 'User Stories for Iteration: ' + this.down('rallyiterationcombobox').rawValue,
                            type: 'json'
                        });
                    }
                }
            ]
        });
    },

    _onIterationsLoaded: function () {
        // Add the user story grid to the page
        this.storyGrid = this.add({
            xtype: 'rallygrid',
            id: 'userStoryGrid',
            columnCfgs: [
                {
                    text: 'Story Name',
                    dataIndex: 'Name',
                    width: 400
                },
                {
                    text: 'Schedule State',
                    dataIndex: 'ScheduleState',
                    renderer: function (value) {
                        return value;
                    },
                    width: 200
                },
                {
                    text: 'Part of Awesome Town?',
                    dataIndex: 'AwesomeTown',
                    width: 200
                }
            ],
            context: this.getContext(),
            enableEditing: false,
            showPagingToolbar: false,
            showRowActionsColumn: false,
            storeConfig: {
                model: 'userstory',
                filters: [this._getIterationFilter()]
            }
        });
    },

    _onIterationChanged: function () {
        let storyStore = this.storyGrid.getStore();
        storyStore.clearFilter(true);
        storyStore.filter(this._getIterationFilter());
    },

    _getIterationFilter: function () {
        return this.down('rallyiterationcombobox').getQueryFromSelected();
    },

    _getDataAsJson: function () {
        var jsonData = [];
        this.storyGrid.getStore().each((record) => {
            jsonData.push({
                "name": record.data.Name,
                "scheduleState": record.data.ScheduleState,
                "awesomeTown": record.data.c_AwesomeTown
            });
        });
        return jsonData;
    }
});
