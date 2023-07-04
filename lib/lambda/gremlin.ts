const gremlin = require("neptune-gremlin")
import {v4 as uuid} from 'uuid';

const host = 'neptunedbcluster-w7tdvus3djb7.cluster-c0xp1jnqu6un.us-east-1.neptune.amazonaws.com'
const port = '8182';
const useIam = false;

const connection = new gremlin.Connection(host, port, useIam)

export const handler = async (event: any = {}) => {
    await connection.connect()

    const node1 = {
        id: "Mark Zuckerberg",
        properties: {
            name: "Test Node",
            a: "A",
            b: "B",
        },
        labels: ["label1", "label2"],
    }
    await connection.saveNode(node1)

    const node2 = {
        id: "Elon Musk",
        properties: {
            name: "Test Node",
            a: "A",
            b: "B",
        },
        labels: ["label1", "label2"],
    }
    await connection.saveNode(node2)

    const edge1 = {
        id: uuid(),
        label: "fights_with",
        to: node2.id,
        from: node1.id,
        properties: {
            "a": "b",
        },
    }

    await connection.saveEdge(edge1)

    const searchResult = await connection.search({})

    console.log('searchResult', searchResult)

    return {
        hi: true,
        searchResult,
    };
};
