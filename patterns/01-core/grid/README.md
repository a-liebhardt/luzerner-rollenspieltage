## Documentation

### Content Page
`.container` to set max content page width.
To prevent placement issues do not set `.container` and `.row` on the same element!

### Grid Row
`.row` to start a new grid row.

### Grid Column
`.col-{viewport}-{size}` to specific content box columns.
Valid viewports are (from small to large): xxs, xs, s, m, l, xl, xxl.
The grid uses a 12 column system, so valid inputs are from 1 to 12.
A column is aligned left per default.

### Helper classes for rows
We have several helper classes to configurate different behaviors for rows.

    # Per default a row will use the full width given by its parent. Stage will add a max page width to it
    .stage

    # Declare first row of an level
    .row--start

    # Declare last row of an level
    .row--end

    # Align the row to the left
    .row--left

    # Align the row to the center
    .row--center

    # Align the row to the right
    .row--right

    # Align the row columns to the left
    .row--align-left

    # Align the row columns to the center
    .row--align-center

    # Align the row columns to the right
    .row--align-right
