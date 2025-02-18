## CSS classes

### Utility

- `hoverable`: applies default styles on hover
- `pressable`: applies default styles to active
- `upper`: Set text as uppercase
- `pointer`: Set cursor pointer
- `no-shadow`: Removes box shadow

### Layout

- `f-ai-center`: flex align items center
- `f-ai-end`: flex align items end
- `f-jc-end`: flex justify content end
- `f-jc-center`: flex justify content center
- `f-jc-start`: flex justify content start
- `f-jc-between`: flex justify content space between
- `f-column`: flex as column
- `vstack`: flex vertical stack
- `hstack`: flex horizontal stack
- `p-def`: applies default padding
- `m-def`: applies default margins(same values as paddings in `p-def`)
- `f-wrap`: flex wrap
- `f-grow`: flex grow 1
- `hide-mobile`: hide on mobile
- `grid`: display grid (6 cols)
- `col-${NUMBER}`: grid columns number(2-6)

### Styling

- `text-error`: Set color to error
- `text-success`: Set color to success
- `border-1`: Applies common borders
- `border-r-1`: Applies common borders radius

### Sizing

- `w-max-content`: width max content
- `w-100`: width 100%
- `h-100`: height 100%
- `w-min-content`: width min content
- `p-0`: removes padding
- `m-0`: removes margins
- `m-auto`: margin auto

### Component

- `outline`: Show button as outlined
- `neutral`: Uses dull color, not the primary
- `card`: Styles as a card
- `separator`: Separator

### Animations

- `fade-in`: Just that

### Colors

- `text-c-unfocus`: Applies a less bright color, like dimmed.

### Text

- `t-a-center`: Aligns text to center.

## CSS components (No semantic styling)

Not fully implemented but all html tag that is being styled by decss, has a counterpart class to avoid semantic
styling.
For example to stylize a custom element as an anchor tag:

```javascript
import "decss/components/classes/link.css";
```

```html
<div class="a">This will look like a link</div>
```

As a drawback to this, the development need to be duplicated, but it's a good trade off to have more flexibility while
avoiding preprocessors or bundling.
