/*! (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/jquery.easy-sortable-tables.js */

/* Sortable Tables API
 * 
 * This script enables the dynamic sorting of columns. Sorting requires links in the 
 * column headers (e.g. thead th a). These links will get "up" and "down" classes when 
 * they are being used for sorting. The "active" class, will be added to the th when 
 * the column is actively being used for sorting.
 * 
 * If the table includes mutiple grouped tbody elements that need to be sorted together,
 * add a class of "grouped" to the table.
 * 
 **/

;(function( $, UNDEFINED ){
	
	var NULL = null,
		tap_evt = 'click',
		re_tbody = /<\/?tbody>/ig,
		$tbody = $('<tbody/>');

	if ( 'ontouchstart' in window ||
		 'createTouch' in document )
	{
		tap_evt = 'touchend';
	}
	
	function findSortKey( $cell )
	{
	    return $cell.is('[data-sort-key]') ? 
					$cell.data('sort-key') :
					$.trim( $cell.find('.sort-key').text().toUpperCase() + ' ' + $cell.text().toUpperCase() );
	};

	$.fn.easySortableTable = function(){
		
		var $tables = $(this);
		
		$tables
			.on( tap_evt, 'thead a', function( e ){
				
				e.preventDefault();

				var $link = $(this),
					column = $link.closest('th').index(),
					$table = $link.closest('table'),
					direction = $link.is('.up') ? -1 : 1,
					grouped = ( $table.find( 'tr[data-table-sort-group]' ).length > 0 ),
					rows = $table.find( 'tbody tr' ).get(),
					$contents = $([]),
					$tb, curr_group;

				// remove tbody elements
				$table.find('tbody').remove();
				
				$table.find('thead a')
					.removeClass( 'up down' )
						.closest('th')
							.removeClass( 'active' );
				$link
					.addClass( direction == 1 ? 'up' : 'down' )
					.closest('th')
						.addClass( 'active' );

				// set the index for sorting
				$.each( rows, function( index, row ){
					var x = findSortKey( $(row).children().eq(column) ),
						z = parseInt( x, 10 );
					// if integer, z == x
		           	this.sortKey =  ( ! isNaN( z ) ) ? z : x;
				} );

				// sort them
				rows.sort(function( a, b ) {
					if ( a.sortKey < b.sortKey ) return -direction;
		            if ( a.sortKey > b.sortKey ) return direction;
		            return 0;
				} );

				// re-append as grouped
				if ( grouped )
				{
					$.each( rows, function( index, row ){
						
						var $row = $(row),
							group = $row.data('table-sort-group');
						
						// create a new row?
						if ( group != curr_group )
						{
							// add the row to the collection?
							if ( curr_group != UNDEFINED )
							{
								$contents = $contents.add( $tb );
							}
							curr_group = group;
							$tb = $tbody.clone();
						}
						
						$tb.append( $row );
						row.sortKey = NULL;
						
					});
					
					// catch the last one
					$contents = $contents.add( $tb );
					
				}
				// reappend as a single tbody
				else
				{
					$contents = $tbody.clone();
					$.each( rows, function( index, row ){
						$contents.append( row );
						row.sortKey = NULL;
					});
				}
				
				// re-append tbody elements
				$table.append( $contents );

			 } );
		
		// maintain the chain
		return this;
	};
	
})(jQuery);