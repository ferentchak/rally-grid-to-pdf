Ext.define('Rally.newProject.StoryGrid', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        // Add iteration combobox to the page
        this.add({
            xtype: 'rallyiterationcombobox',
            id: 'iterationComboBox',
            listeners: {
                ready: this._onIterationsLoaded,
                select: this._onIterationChanged,
                scope: this
            }
        });
    },

    _onIterationsLoaded: function() {
        // Add the user story grid to the page
        this.add({
            xtype: 'rallygrid',
            id: 'userStoryGrid',
            columnCfgs: [
            {
                text: 'Story Name',
                dataIndex: 'Name',
                width: 350
            },
            {
                text: 'Schedule State',
                dataIndex: 'ScheduleState',
                width: 150
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
            storeConfig: {
                model: 'userstory',
                filters: [this._getIterationFilter()]
            }
        });
        
        // Add the 'Print to PDF' button to the page
        this.add({
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
        });
    },

    _onIterationChanged: function() {
        let storyGrid = this.down('rallygrid'),
            storyStore = storyGrid.getStore();
            storyStore.clearFilter(true);
            storyStore.filter(this._getIterationFilter());
    },

    _getIterationFilter: function() {
        return this.down('rallyiterationcombobox').getQueryFromSelected();
    },
});
