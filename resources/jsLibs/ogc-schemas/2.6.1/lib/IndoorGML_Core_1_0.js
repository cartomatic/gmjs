var IndoorGML_Core_1_0_Module_Factory = function () {
  var IndoorGML_Core_1_0 = {
    n: 'IndoorGML_Core_1_0',
    dens: 'http:\/\/www.opengis.net\/indoorgml\/1.0\/core',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    deps: ['XLink_1_0', 'GML_3_2_1'],
    tis: [{
        ln: 'NodesType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'stateMember',
            rq: true,
            col: true,
            ti: '.StateMemberType'
          }, {
            n: 'owns',
            ti: 'Boolean',
            an: {
              lp: 'owns'
            },
            t: 'a'
          }, {
            n: 'aggregationType',
            ti: 'GML_3_2_1.AggregationType',
            an: {
              lp: 'aggregationType'
            },
            t: 'a'
          }]
      }, {
        ln: 'TransitionPropertyType',
        ps: [{
            n: 'transition',
            rq: true,
            en: 'Transition',
            ti: '.TransitionType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'MultiLayeredGraphType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'spaceLayers',
            rq: true,
            col: true,
            ti: '.SpaceLayersType'
          }, {
            n: 'interEdges',
            mno: 0,
            col: true,
            ti: '.InterEdgesType'
          }]
      }, {
        ln: 'ExternalReferenceType',
        ps: [{
            n: 'informationSystem'
          }, {
            n: 'externalObject',
            rq: true,
            ti: '.ExternalObjectReferenceType'
          }]
      }, {
        ln: 'CellSpaceBoundaryPropertyType',
        ps: [{
            n: 'cellSpaceBoundary',
            rq: true,
            mx: false,
            dom: false,
            en: 'CellSpaceBoundary',
            ti: '.CellSpaceBoundaryType',
            t: 'er'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'StateType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'duality',
            ti: '.CellSpacePropertyType'
          }, {
            n: 'connects',
            mno: 0,
            col: true,
            ti: '.TransitionPropertyType'
          }, {
            n: 'geometry',
            ti: 'GML_3_2_1.PointPropertyType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'IndoorFeaturesType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'primalSpaceFeatures',
            ti: '.PrimalSpaceFeaturesPropertyType'
          }, {
            n: 'multiLayeredGraph',
            rq: true,
            en: 'MultiLayeredGraph',
            ti: '.MultiLayeredGraphType'
          }]
      }, {
        ln: 'SpaceLayerType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'usage',
            mno: 0,
            col: true,
            ti: 'GML_3_2_1.CodeType'
          }, {
            n: 'terminationDate',
            ti: 'DateTime'
          }, {
            n: 'function',
            mno: 0,
            col: true,
            ti: 'GML_3_2_1.CodeType'
          }, {
            n: 'creationDate',
            ti: 'DateTime'
          }, {
            n: 'clazz',
            en: 'class'
          }, {
            n: 'nodes',
            rq: true,
            col: true,
            ti: '.NodesType'
          }, {
            n: 'edges',
            mno: 0,
            col: true,
            ti: '.EdgesType'
          }]
      }, {
        ln: 'SpaceLayersType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'spaceLayerMember',
            rq: true,
            col: true,
            ti: '.SpaceLayerMemberType'
          }, {
            n: 'aggregationType',
            ti: 'GML_3_2_1.AggregationType',
            an: {
              lp: 'aggregationType'
            },
            t: 'a'
          }]
      }, {
        ln: 'MultiLayeredGraphPropertyType',
        ps: [{
            n: 'multiLayeredGraph',
            rq: true,
            en: 'MultiLayeredGraph',
            ti: '.MultiLayeredGraphType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'PrimalSpaceFeaturesPropertyType',
        ps: [{
            n: 'primalSpaceFeatures',
            rq: true,
            en: 'PrimalSpaceFeatures',
            ti: '.PrimalSpaceFeaturesType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'InterLayerConnectionMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'interLayerConnection',
            rq: true,
            en: 'InterLayerConnection',
            ti: '.InterLayerConnectionType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'ExternalObjectReferenceType',
        tn: 'externalObjectReferenceType',
        ps: [{
            n: 'name'
          }, {
            n: 'uri',
            rq: true
          }]
      }, {
        ln: 'CellSpacePropertyType',
        ps: [{
            n: 'cellSpace',
            rq: true,
            mx: false,
            dom: false,
            en: 'CellSpace',
            ti: '.CellSpaceType',
            t: 'er'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CellSpaceBoundaryMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'cellSpaceBoundary',
            rq: true,
            mx: false,
            dom: false,
            en: 'CellSpaceBoundary',
            ti: '.CellSpaceBoundaryType',
            t: 'er'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CellSpaceBoundaryType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'duality',
            ti: '.TransitionPropertyType'
          }, {
            n: 'geometry3D',
            rq: true,
            ti: 'GML_3_2_1.SurfacePropertyType'
          }, {
            n: 'geometry2D',
            rq: true,
            ti: 'GML_3_2_1.CurvePropertyType'
          }, {
            n: 'externalReference',
            mno: 0,
            col: true,
            ti: '.ExternalReferenceType'
          }]
      }, {
        ln: 'InterEdgesType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'interLayerConnectionMember',
            rq: true,
            col: true,
            ti: '.InterLayerConnectionMemberType'
          }, {
            n: 'aggregationType',
            ti: 'GML_3_2_1.AggregationType',
            an: {
              lp: 'aggregationType'
            },
            t: 'a'
          }]
      }, {
        ln: 'StatePropertyType',
        ps: [{
            n: 'state',
            rq: true,
            en: 'State',
            ti: '.StateType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'SpaceLayerMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'spaceLayer',
            rq: true,
            en: 'SpaceLayer',
            ti: '.SpaceLayerType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'InterLayerConnectionPropertyType',
        ps: [{
            n: 'interLayerConnection',
            rq: true,
            en: 'InterLayerConnection',
            ti: '.InterLayerConnectionType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'EdgesType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'transitionMember',
            mno: 0,
            col: true,
            ti: '.TransitionMemberType'
          }, {
            n: 'owns',
            ti: 'Boolean',
            an: {
              lp: 'owns'
            },
            t: 'a'
          }, {
            n: 'aggregationType',
            ti: 'GML_3_2_1.AggregationType',
            an: {
              lp: 'aggregationType'
            },
            t: 'a'
          }]
      }, {
        ln: 'InterLayerConnectionType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'typeOfTopoExpression'
          }, {
            n: 'comment'
          }, {
            n: 'interConnects',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.StatePropertyType'
          }, {
            n: 'connectedLayers',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            en: 'ConnectedLayers',
            ti: '.SpaceLayerPropertyType'
          }]
      }, {
        ln: 'StateMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'state',
            rq: true,
            en: 'State',
            ti: '.StateType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'CellSpaceMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'cellSpace',
            rq: true,
            mx: false,
            dom: false,
            en: 'CellSpace',
            ti: '.CellSpaceType',
            t: 'er'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TransitionMemberType',
        bti: 'GML_3_2_1.AbstractFeatureMemberType',
        ps: [{
            n: 'transition',
            rq: true,
            en: 'Transition',
            ti: '.TransitionType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'TransitionType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'weight',
            ti: 'Double'
          }, {
            n: 'connects',
            rq: true,
            mno: 2,
            mxo: 2,
            col: true,
            ti: '.StatePropertyType'
          }, {
            n: 'duality',
            ti: '.CellSpaceBoundaryPropertyType'
          }, {
            n: 'geometry',
            ti: 'GML_3_2_1.CurvePropertyType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'SpaceLayerPropertyType',
        ps: [{
            n: 'spaceLayer',
            rq: true,
            en: 'SpaceLayer',
            ti: '.SpaceLayerType'
          }, {
            n: 'nilReason',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'nilReason'
            },
            t: 'a'
          }, {
            n: 'remoteSchema',
            an: {
              lp: 'remoteSchema',
              ns: 'http:\/\/www.opengis.net\/gml\/3.2'
            },
            t: 'a'
          }, {
            n: 'type',
            ti: 'XLink_1_0.TypeType',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'XLink_1_0.ShowType',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'XLink_1_0.ActuateType',
            t: 'a'
          }]
      }, {
        ln: 'PrimalSpaceFeaturesType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'cellSpaceMember',
            mno: 0,
            col: true,
            ti: 'GML_3_2_1.FeaturePropertyType'
          }, {
            n: 'cellSpaceBoundaryMember',
            mno: 0,
            col: true,
            ti: 'GML_3_2_1.FeaturePropertyType'
          }, {
            n: 'aggregationType',
            ti: 'GML_3_2_1.AggregationType',
            an: {
              lp: 'aggregationType'
            },
            t: 'a'
          }]
      }, {
        ln: 'CellSpaceType',
        bti: 'GML_3_2_1.AbstractFeatureType',
        ps: [{
            n: 'geometry3D',
            rq: true,
            en: 'Geometry3D',
            ti: 'GML_3_2_1.SolidPropertyType'
          }, {
            n: 'geometry2D',
            rq: true,
            en: 'Geometry2D',
            ti: 'GML_3_2_1.SurfacePropertyType'
          }, {
            n: 'duality',
            ti: '.StatePropertyType'
          }, {
            n: 'externalReference',
            mno: 0,
            col: true,
            ti: '.ExternalReferenceType'
          }, {
            n: 'partialboundedBy',
            mno: 0,
            col: true,
            ti: '.CellSpaceBoundaryPropertyType'
          }]
      }, {
        t: 'enum',
        ln: 'SpaceLayerClassTypeType',
        vs: ['TOPOGRAPHIC', 'SENSOR', 'LOGICAL', 'TAGS', 'UNKNOWN']
      }, {
        t: 'enum',
        ln: 'TypeOfTopoExpressionCodeEnumerationType',
        vs: ['CONTAINS', 'OVERLAPS', 'EQUALS', 'WITHIN', 'CROSSES', 'INTERSECTS']
      }],
    eis: [{
        en: 'SpaceLayer',
        ti: '.SpaceLayerType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'State',
        ti: '.StateType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'PrimalSpaceFeatures',
        ti: '.PrimalSpaceFeaturesType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'InterLayerConnection',
        ti: '.InterLayerConnectionType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'MultiLayeredGraph',
        ti: '.MultiLayeredGraphType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'CellSpaceBoundary',
        ti: '.CellSpaceBoundaryType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'CellSpace',
        ti: '.CellSpaceType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'Transition',
        ti: '.TransitionType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }, {
        en: 'IndoorFeatures',
        ti: '.IndoorFeaturesType',
        sh: {
          lp: 'AbstractFeature',
          ns: 'http:\/\/www.opengis.net\/gml\/3.2'
        }
      }]
  };
  return {
    IndoorGML_Core_1_0: IndoorGML_Core_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], IndoorGML_Core_1_0_Module_Factory);
}
else {
  var IndoorGML_Core_1_0_Module = IndoorGML_Core_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.IndoorGML_Core_1_0 = IndoorGML_Core_1_0_Module.IndoorGML_Core_1_0;
  }
  else {
    var IndoorGML_Core_1_0 = IndoorGML_Core_1_0_Module.IndoorGML_Core_1_0;
  }
}