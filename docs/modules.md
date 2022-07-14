[onenote](README.md) / Modules

# onenote

## Table of contents

### Classes

- [AuthenticationClient](classes/AuthenticationClient.md)
- [GraphRequest](classes/GraphRequest.md)

### Interfaces

- [IClientOptions](interfaces/IClientOptions.md)

### Components Types

- [ErrorType](modules.md#errortype)

### Type Aliases

- [InnerErrorType](modules.md#innererrortype)
- [LinkProps](modules.md#linkprops)
- [TableBodyProps](modules.md#tablebodyprops)
- [TableCellProps](modules.md#tablecellprops)
- [TableContainerProps](modules.md#tablecontainerprops)
- [TableHeaderCellProps](modules.md#tableheadercellprops)
- [TableHeadersProps](modules.md#tableheadersprops)
- [TableRowProps](modules.md#tablerowprops)
- [TableRowsProps](modules.md#tablerowsprops)
- [TemplateActiveSelectionProps](modules.md#templateactiveselectionprops)
- [TemplateButtonProps](modules.md#templatebuttonprops)
- [TemplateButtonsProps](modules.md#templatebuttonsprops)
- [TemplateFormProps](modules.md#templateformprops)
- [TemplateInputProps](modules.md#templateinputprops)
- [TemplateInputsProps](modules.md#templateinputsprops)
- [TemplatePreviewProps](modules.md#templatepreviewprops)

### Configuration Variables

- [AUTH\_CONFIG](modules.md#auth_config)
- [GRAPH\_API\_VERSION](modules.md#graph_api_version)
- [GRAPH\_BASE\_URL](modules.md#graph_base_url)

### Pages

- [Home](modules.md#home)
- [CreateTemplate](modules.md#createtemplate)
- [ViewNotebooks](modules.md#viewnotebooks)
- [ViewSections](modules.md#viewsections)

### Components

- [ErrorMessage](modules.md#errormessage)
- [NavbarContainer](modules.md#navbarcontainer)
- [NavbarLink](modules.md#navbarlink)
- [NavbarLinks](modules.md#navbarlinks)
- [NotebookMain](modules.md#notebookmain)
- [SectionMain](modules.md#sectionmain)
- [TableBody](modules.md#tablebody)
- [TableCell](modules.md#tablecell)
- [TableContainer](modules.md#tablecontainer)
- [TableHeaderCell](modules.md#tableheadercell)
- [TableHeaders](modules.md#tableheaders)
- [TableRow](modules.md#tablerow)
- [TableRows](modules.md#tablerows)
- [TemplateActiveSelection](modules.md#templateactiveselection)
- [TemplateButton](modules.md#templatebutton)
- [TemplateButtons](modules.md#templatebuttons)
- [TemplateForm](modules.md#templateform)
- [TemplateInput](modules.md#templateinput)
- [TemplateInputs](modules.md#templateinputs)
- [TemplatePreview](modules.md#templatepreview)

## Components Types

### ErrorType

Ƭ **ErrorType**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `code?` | `T` |
| `innerError?` | [`InnerErrorType`](modules.md#innererrortype) |
| `message?` | `string` |

#### Defined in

[components/Error/Type.ts:11](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Error/Type.ts#L11)

## Type Aliases

### InnerErrorType

Ƭ **InnerErrorType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client-request-id?` | `string` |
| `date?` | `string` |
| `request-id?` | `string` |

#### Defined in

[components/Error/Type.ts:1](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Error/Type.ts#L1)

___

### LinkProps

Ƭ **LinkProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `href` | `string` |
| `value` | `string` |

#### Defined in

[components/Navbar/Link.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Navbar/Link.tsx#L3)

___

### TableBodyProps

Ƭ **TableBodyProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customDataType?` | `string` |
| `rows` | `any`[] |

#### Defined in

[components/Table/Body.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Body.tsx#L3)

___

### TableCellProps

Ƭ **TableCellProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cellType` | `string` |
| `text` | `string` \| `any` |

#### Defined in

[components/Table/Cell.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Cell.tsx#L4)

___

### TableContainerProps

Ƭ **TableContainerProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customDataType?` | `string` |
| `headers` | `string`[] |
| `rows` | `any`[] |

#### Defined in

[components/Table/Container.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Container.tsx#L4)

___

### TableHeaderCellProps

Ƭ **TableHeaderCellProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `header` | `string` |

#### Defined in

[components/Table/HeaderCell.tsx:1](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/HeaderCell.tsx#L1)

___

### TableHeadersProps

Ƭ **TableHeadersProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers` | `string`[] |

#### Defined in

[components/Table/Headers.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Headers.tsx#L3)

___

### TableRowProps

Ƭ **TableRowProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customDataType?` | `string` |
| `row` | `any` |

#### Defined in

[components/Table/Row.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Row.tsx#L4)

___

### TableRowsProps

Ƭ **TableRowsProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customDataType?` | `string` |
| `rows` | `any` |

#### Defined in

[components/Table/Rows.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Table/Rows.tsx#L3)

___

### TemplateActiveSelectionProps

Ƭ **TemplateActiveSelectionProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `label` | `string` |

#### Defined in

[components/Template/ActiveSelection.tsx:1](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/ActiveSelection.tsx#L1)

___

### TemplateButtonProps

Ƭ **TemplateButtonProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `backgroundColor?` | `string` |
| `handleSubmit?` | `MouseEventHandler`<`HTMLButtonElement`\> |
| `name` | `string` |

#### Defined in

[components/Template/Button.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Button.tsx#L3)

___

### TemplateButtonsProps

Ƭ **TemplateButtonsProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handleSubmit` | `MouseEventHandler`<`HTMLButtonElement`\> |

#### Defined in

[components/Template/Buttons.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Buttons.tsx#L4)

___

### TemplateFormProps

Ƭ **TemplateFormProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `notebook` | `any` |
| `section` | `any` |

#### Defined in

[components/Template/Form.tsx:8](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Form.tsx#L8)

___

### TemplateInputProps

Ƭ **TemplateInputProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputName` | `string` |
| `label?` | `string` |
| `modifyHeader` | `ChangeEventHandler`<`HTMLInputElement`\> |
| `placeholder` | `string` |
| `shouldFocus` | `boolean` |
| `type` | `string` |
| `value` | `string` |

#### Defined in

[components/Template/Input.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Input.tsx#L3)

___

### TemplateInputsProps

Ƭ **TemplateInputsProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `header` | `string` |
| `modifyHeader` | `ChangeEventHandler`<`HTMLInputElement`\> |

#### Defined in

[components/Template/Inputs.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Inputs.tsx#L4)

___

### TemplatePreviewProps

Ƭ **TemplatePreviewProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers` | `string`[] |
| `rows` | `string`[] |

#### Defined in

[components/Template/Preview.tsx:4](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/components/Template/Preview.tsx#L4)

## Configuration Variables

### AUTH\_CONFIG

• `Const` **AUTH\_CONFIG**: [`IClientOptions`](interfaces/IClientOptions.md)

**`Constant`**

Default options to provide to [AuthenticationClient](classes/AuthenticationClient.md)

#### Defined in

[lib/Constants.ts:22](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/Constants.ts#L22)

___

### GRAPH\_API\_VERSION

• `Const` **GRAPH\_API\_VERSION**: `string` = `"v1.0"`

**`Constant`**

Default API Endpoint version.

#### Defined in

[lib/Constants.ts:8](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/Constants.ts#L8)

___

### GRAPH\_BASE\_URL

• `Const` **GRAPH\_BASE\_URL**: `string` = `"http://graph.microsoft.com/"`

**`Constant`**

Default URL for Graph requests.

#### Defined in

[lib/Constants.ts:15](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/lib/Constants.ts#L15)

## Pages

### Home

• `Const` **Home**: `NextPage`

Page to render the home / landing page.

#### Defined in

[pages/index.tsx:10](https://gitlab.com/ennovar1/OneNote/-/blob/de56a48/pages/index.tsx#L10)

___

### CreateTemplate

▸ **CreateTemplate**(): `Element`

#### Returns

`Element`

___

### ViewNotebooks

▸ **ViewNotebooks**(`props`): `Element`

Page to render list of notebooks

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`Element`

___

### ViewSections

▸ **ViewSections**(`props`): `Element`

Page to view list of sections. This page needs a notebook ID to make a graph request, so it validates the selected notebook via cookies.

**`See`**

[ViewNotebooks](modules.md#viewnotebooks)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`Element`

## Components

### ErrorMessage

▸ **ErrorMessage**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.error` | [`ErrorType`](modules.md#errortype)<`any`\> |

#### Returns

`Element`

___

### NavbarContainer

▸ **NavbarContainer**(): `Element`

Container component to render the navigation bar.

#### Returns

`Element`

___

### NavbarLink

▸ **NavbarLink**(`props`): `Element`

Utilizes LinkProps type to render a valid navigation link.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LinkProps`](modules.md#linkprops) |

#### Returns

`Element`

___

### NavbarLinks

▸ **NavbarLinks**(): `Element`

A container to hold necessary links for navigation.

#### Returns

`Element`

___

### NotebookMain

▸ **NotebookMain**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.notebooks` | `any` |

#### Returns

`Element`

___

### SectionMain

▸ **SectionMain**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.notebookTitle` | `string` |
| `__namedParameters.sections` | `any` |

#### Returns

`Element`

___

### TableBody

▸ **TableBody**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TableBodyProps`](modules.md#tablebodyprops) |

#### Returns

`Element`

___

### TableCell

▸ **TableCell**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableCellProps`](modules.md#tablecellprops) |

#### Returns

`Element`

___

### TableContainer

▸ **TableContainer**(`props`): `Element`

Reusable table container so that rendering data is easier.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TableContainerProps`](modules.md#tablecontainerprops) |

#### Returns

`Element`

___

### TableHeaderCell

▸ **TableHeaderCell**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableHeaderCellProps`](modules.md#tableheadercellprops) |

#### Returns

`Element`

___

### TableHeaders

▸ **TableHeaders**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`TableHeadersProps`](modules.md#tableheadersprops) |

#### Returns

`Element`

___

### TableRow

▸ **TableRow**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TableRowProps`](modules.md#tablerowprops) |

#### Returns

`Element`

___

### TableRows

▸ **TableRows**(`props`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TableRowsProps`](modules.md#tablerowsprops) |

#### Returns

`any`

___

### TemplateActiveSelection

▸ **TemplateActiveSelection**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateActiveSelectionProps`](modules.md#templateactiveselectionprops) |

#### Returns

`Element`

___

### TemplateButton

▸ **TemplateButton**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateButtonProps`](modules.md#templatebuttonprops) |

#### Returns

`Element`

___

### TemplateButtons

▸ **TemplateButtons**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateButtonsProps`](modules.md#templatebuttonsprops) |

#### Returns

`Element`

___

### TemplateForm

▸ **TemplateForm**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateFormProps`](modules.md#templateformprops) |

#### Returns

`Element`

___

### TemplateInput

▸ **TemplateInput**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateInputProps`](modules.md#templateinputprops) |

#### Returns

`Element`

___

### TemplateInputs

▸ **TemplateInputs**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplateInputsProps`](modules.md#templateinputsprops) |

#### Returns

`Element`

___

### TemplatePreview

▸ **TemplatePreview**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TemplatePreviewProps`](modules.md#templatepreviewprops) |

#### Returns

`Element`
