pragma solidity ^0.4.26;
import "./Producer.sol";

contract Content {

    bool public status;
    ContentInfo public data;
    address public owner;
    Producer public producer;
    mapping (address => ReqInfo) public reqInfos;
    address[] public reqAccts;
    uint public numofReqs;
    
    event dataAdded(string contentName,string contentDigest,string contentExp,uint timestamp,string publisherName,string publisherPk,address publisherAddress);
    event ReqAdded(address IDSCAddress,address consumerAddr,string consumerPk);
    event ReqRemoved(address consumerAddr);
    event statusChanged(bool status);
    
    struct ContentInfo{
        string contentName;
        string contentDigest;
        string contentExp;
        string producerName;
        string producerPk;
        address producerAddress;
        uint timestamp;
    }
    struct ReqInfo{
        address IDSCAddr;
        address consumerAddr;
        string consumerPk;
    }
    constructor(address pro)public{
        owner = msg.sender;
        producer=Producer(pro);
    }
    
    function addData(string _conName,string _conDigest,string _conExp) onlyOwner public{
       data.contentName=_conName; 
       data.contentDigest=_conDigest;
       data.contentExp=_conExp;
       data.producerName=producer.getProducerName();
       data.producerPk=producer.getProducerNDNPk();
       data.producerAddress=producer.getProducerAddr();
       data.timestamp=now;
       status = true;
       emit dataAdded(_conName,_conDigest,_conExp,data.timestamp,data.producerName,data.producerPk,data.producerAddress);
    }
    
    function revokeData() onlyOwner public{
        status=false;
        emit statusChanged(status);
       
    }
    
    function getDataInfo()public view returns (string, string, string, string, string, address, uint, bool) {
        if(status==true && producer.getProStatus()==true)
         return (data.contentName,data.contentDigest,data.producerName,data.contentExp,data.producerPk,data.producerAddress,data.timestamp,status);
    }
    
    function digestRequest(address _IDSCaddr, address _consumerAddr, string _consumerPk) public{
        ReqInfo memory newReq = ReqInfo(_IDSCaddr, _consumerAddr, _consumerPk);
        reqAccts.push(_consumerAddr);
        reqInfos[_consumerAddr] = newReq;
        reqAccts.push(_consumerAddr);
        numofReqs++;
        emit ReqAdded(_IDSCaddr,_consumerAddr,_consumerPk);
    }
    
    function removeRequest(address _consumerAddr) onlyOwner public {
       uint j=0;
        for (uint i = 0; i<reqAccts.length-1; i++){
            if(reqAccts[i]==_consumerAddr)
             for(j=i;j<reqAccts.length-1;j++){
                    reqAccts[j]=reqAccts[j+1];
                    
                }
                delete reqAccts[reqAccts.length-1];
                reqAccts.length--;
                numofReqs--;
                emit ReqRemoved(_consumerAddr);
        }
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
}
