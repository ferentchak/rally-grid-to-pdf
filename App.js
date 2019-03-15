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
                        printJS({
                            printable: 'userStoryGrid',
                            type: 'html',
                            // css files need to be passed along as grid doesn't display properly otherwise
                            css: [
                                '/apps/2.0/rui/resources/css/rui-all_01.css',
                                '/apps/2.0/rui/resources/css/rui-all_02.css',
                                '/apps/2.0/rui/resources/css/rui-fonts.css'
                            ],
                            scanStyles: false, // Disable scanning of styles since we're passing the styles in the function call
                            documentTitle: 'User Stories for Iteration: ' + this.down('rallyiterationcombobox').rawValue
                        });
                    }
                }
            ]
        });
    },

    _onIterationsLoaded: function () {
        // Add the user story grid to the page
        this.add({
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
        let storyGrid = this.down('rallygrid'),
            storyStore = storyGrid.getStore();
        storyStore.clearFilter(true);
        storyStore.filter(this._getIterationFilter());
    },

    _getIterationFilter: function () {
        return this.down('rallyiterationcombobox').getQueryFromSelected();
    },
});
