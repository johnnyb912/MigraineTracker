import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'messages-sidebar',
    templateUrl     : './messages-sidebar.component.html',
    styleUrls       : [ './messages-sidebar.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for MessagesSidebar component
 */
export class MessagesSidebarComponent {
    /**
     * MessagesSidebarComponent constructor
     */
    constructor() {
    }

    /**
     * required icons for display in template
     * @type {{bell: (any|T), envelope: (any|T), check: (any|T), checkmark: (any|T)}}
     */
    icons : any = {
        bell        : require('images/SvgIcons/icon-bell.svg'),
        envelope    : require('images/SvgIcons/icon-envelope.svg'),
        check       : require('images/SvgIcons/icon-check-circle.svg'),
        checkmark   : require('images/SvgIcons/icon-checkmark.svg')
    };

    /**
     * list for messages sidebar
     * @type {{title: string, typeMessages: string, checked: boolean, newMessages: boolean, open: boolean}[]}
     */
    messagesList : Array<any> = [
        {
            title : 'Salary Updates',
            typeMessages : 'Notification',
            checked : false,
            newMessages : false,
            open : true
        },
        {
            title : 'Workwell Launch',
            typeMessages : 'Notification',
            checked : true,
            newMessages : false,
            open : false
        },
        {
            title : 'Josh Johnson',
            typeMessages : 'Message',
            checked : false,
            newMessages : true,
            open : false
        },
        {
            title : 'Lorem Ipsum',
            typeMessages : 'To Do',
            checked : false,
            newMessages : false,
            open : false
        }
    ];
}
