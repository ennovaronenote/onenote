[onenote](README.md) / Modules

# onenote

## Table of contents

### Classes

- [AuthenticationClient](classes/AuthenticationClient.md)
- [GraphRequest](classes/GraphRequest.md)

### Interfaces

- [IClientOptions](interfaces/IClientOptions.md)

### Type Aliases

- [ErrorType](modules.md#errortype)
- [InnerErrorType](modules.md#innererrortype)
- [LinkProps](modules.md#linkprops)

### Configuration Variables

- [AUTH\_CONFIG](modules.md#auth_config)
- [GRAPH\_API\_VERSION](modules.md#graph_api_version)
- [GRAPH\_BASE\_URL](modules.md#graph_base_url)

### Pages

- [Home](modules.md#home)
- [ViewNotebooks](modules.md#viewnotebooks)
- [ViewSections](modules.md#viewsections)

### Components

- [ErrorMessage](modules.md#errormessage)
- [NavbarContainer](modules.md#navbarcontainer)
- [NavbarLink](modules.md#navbarlink)
- [NavbarLinks](modules.md#navbarlinks)
- [NotebookCell](modules.md#notebookcell)
- [NotebookHeader](modules.md#notebookheader)
- [NotebookList](modules.md#notebooklist)
- [SectionMain](modules.md#sectionmain)

## Type Aliases

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

[components/Error/Type.ts:7](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/components/Error/Type.ts#L7)

___

### InnerErrorType

Ƭ **InnerErrorType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client-request-id?` | `string` |
| `date?` | `string` |
| `request-id?` | `string` |

#### Defined in

[components/Error/Type.ts:1](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/components/Error/Type.ts#L1)

___

### LinkProps

Ƭ **LinkProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `href` | `string` |
| `value` | `string` |

#### Defined in

[components/Navbar/Link.tsx:3](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/components/Navbar/Link.tsx#L3)

## Configuration Variables

### AUTH\_CONFIG

• `Const` **AUTH\_CONFIG**: [`IClientOptions`](interfaces/IClientOptions.md)

**`Constant`**

Default options to provide to [AuthenticationClient](classes/AuthenticationClient.md)

#### Defined in

[lib/Constants.ts:22](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/lib/Constants.ts#L22)

___

### GRAPH\_API\_VERSION

• `Const` **GRAPH\_API\_VERSION**: `string` = `"v1.0"`

**`Constant`**

Default API Endpoint version.

#### Defined in

[lib/Constants.ts:8](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/lib/Constants.ts#L8)

___

### GRAPH\_BASE\_URL

• `Const` **GRAPH\_BASE\_URL**: `string` = `"http://graph.microsoft.com/"`

**`Constant`**

Default URL for Graph requests.

#### Defined in

[lib/Constants.ts:15](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/lib/Constants.ts#L15)

## Pages

### Home

• `Const` **Home**: `NextPage`

Page to render the home / landing page.

#### Defined in

[pages/index.tsx:10](https://gitlab.com/ennovar1/OneNote/-/blob/3185caa/pages/index.tsx#L10)

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

### NotebookCell

▸ **NotebookCell**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.content` | `any` |
| `__namedParameters.contentType?` | `string` |

#### Returns

`Element`

___

### NotebookHeader

▸ **NotebookHeader**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.title` | `string` |

#### Returns

`Element`

___

### NotebookList

▸ **NotebookList**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `any` |

#### Returns

`Element`

___

### SectionMain

▸ **SectionMain**(): `Element`

#### Returns

`Element`
