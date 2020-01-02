import { QueryFilter } from '../core/graylog-query.builder';
import { EVENT_LOG_STREAM } from '../app.constant';

export function getDFSummaryQuery({ eventType }) {
    const query = new QueryFilter();

    query.createFilter('streams', EVENT_LOG_STREAM);

    if (eventType === 'EXTRACT') {
        query
            .createFilter('event_action')
            .OR('Create')
            .OR('Execute')
            .OR('FileGen');

        query.createFilter('event_type', 'Extract');
    } else if (eventType === 'METRICS') {
        query.createFilter('event_action', 'Request');
        query.createFilter('event_type', 'Metrics');
    } else {
        query
            .createFilter('event_action')
            .OR('Create')
            .OR('Execute')
            .OR('FileGen')
            .OR('Request');

        query
            .createFilter('event_type')
            .OR('Extract')
            .OR('Metrics');
    }

    query
        .createFilter('logTag')
        .OR('SNOWFLAKE_QUERY')
        .OR('TASK END')
        .OR('TASK START');

    const applicationNameFilter = query.createFilter(
        'sourceApplication_applicationName',
        'Platform APIs'
    );

    const applicationComponent = query.createFilter(
        'sourceApplication_applicationComponent',
        'Data Factory'
    );

    if (eventType !== 'METRICS') {
        applicationNameFilter.OR('Connect Extracts');
        applicationComponent.OR('FileGen').OR('AggEngine');
    }

    return query;
}
