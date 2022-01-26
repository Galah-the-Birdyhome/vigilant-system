

# AlgebraVirtualPool

## Modifiers
### onlyPool









### onlyFarming











## Variables
### address poolAddress immutable



### address farmingAddress immutable



### uint32 desiredEndTimestamp immutable



### uint32 desiredStartTimestamp immutable



### uint32 initTimestamp 



### uint32 endTimestamp 



### uint32 timeOutside 



### uint160 globalSecondsPerLiquidityCumulative 



### uint128 prevLiquidity 



### uint128 currentLiquidity 



### uint32 prevTimestamp 



### int24 globalTick 



### mapping(int24 &#x3D;&gt; struct TickManager.Tick) ticks 




## Functions
### constructor


`constructor(address,address,uint32,uint32)`  public





| Name | Type | Description |
| ---- | ---- | ----------- |
| _poolAddress | address |  |
| _farmingAddress | address |  |
| _desiredStartTimestamp | uint32 |  |
| _desiredEndTimestamp | uint32 |  |


### finish

onlyFarming

`finish(uint32,uint32)`  external





| Name | Type | Description |
| ---- | ---- | ----------- |
| _endTimestamp | uint32 | The timestamp of the exitFarming |
| startTime | uint32 | The timestamp of planned start of the incentive. Used as initTimestamp if there were no swaps through the entire incentive |


### getInnerSecondsPerLiquidity


`getInnerSecondsPerLiquidity(int24,int24)` view external





| Name | Type | Description |
| ---- | ---- | ----------- |
| bottomTick | int24 | The bottom tick of a position |
| topTick | int24 | The top tick of a position |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| innerSecondsSpentPerLiquidity | uint160 |  |
| initTime | uint32 |  |
| endTime | uint32 |  |

### cross

onlyPool

`cross(int24,bool)`  external





| Name | Type | Description |
| ---- | ---- | ----------- |
| nextTick | int24 | The crossed tick |
| zeroForOne | bool | The direction |


### increaseCumulative

onlyPool

`increaseCumulative(uint32)`  external





| Name | Type | Description |
| ---- | ---- | ----------- |
| currentTimestamp | uint32 | The timestamp of the current swap |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum IAlgebraVirtualPool.Status |  |

### processSwap

onlyPool

`processSwap()`  external







### applyLiquidityDeltaToPosition

onlyFarming

`applyLiquidityDeltaToPosition(int24,int24,int128,int24)`  external





| Name | Type | Description |
| ---- | ---- | ----------- |
| bottomTick | int24 | The bottom tick of a position |
| topTick | int24 | The top tick of a position |
| liquidityDelta | int128 | The amount of liquidity in a position |
| tick | int24 | The current tick in the main pool |




---

